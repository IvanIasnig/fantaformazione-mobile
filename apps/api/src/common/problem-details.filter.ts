import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from "@nestjs/common";
import type { Request, Response } from "express";
import { STATUS_CODES } from "node:http";
import { ProblemDetails, ProblemDetailsException } from "./problem-details.exception.js";

/**
 * Converte ogni eccezione in application/problem+json (RFC 9457).
 * Gli errori inattesi diventano un 500 generico: i dettagli finiscono nei log, mai nella risposta.
 */
@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ProblemDetailsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    const problem = toProblemDetails(exception);
    // Le HttpException sono lanciate di proposito; ogni altro 500 è un bug da indagare
    if (problem.status >= 500 && !(exception instanceof HttpException)) {
      this.logger.error(exception);
    }

    response
      .status(problem.status)
      .type("application/problem+json")
      .json({ ...problem, instance: request.originalUrl, traceId: request.id });
  }
}

function toProblemDetails(exception: unknown): ProblemDetails {
  if (exception instanceof ProblemDetailsException) {
    return exception.problem;
  }

  if (exception instanceof HttpException) {
    const status = exception.getStatus();
    const problem: ProblemDetails = {
      type: "about:blank",
      title: STATUS_CODES[status] ?? "Error",
      status,
    };

    const body = exception.getResponse();
    const message = typeof body === "string" ? body : (body as { message?: unknown }).message;
    if (Array.isArray(message)) {
      // Errori della ValidationPipe: uno per vincolo violato
      problem.detail = "La richiesta contiene dati non validi.";
      problem.errors = message;
    } else if (typeof message === "string" && message !== problem.title) {
      problem.detail = message;
    }
    return problem;
  }

  // Errori dei middleware Express (http-errors), es. 413 dal body parser: `expose` li marca come
  // errori del client con un messaggio sicuro da restituire
  if (isExposedHttpError(exception)) {
    return {
      type: "about:blank",
      title: STATUS_CODES[exception.status] ?? "Error",
      status: exception.status,
      detail: exception.message,
    };
  }

  return { type: "about:blank", title: "Internal Server Error", status: 500 };
}

function isExposedHttpError(error: unknown): error is Error & { status: number } {
  return (
    error instanceof Error &&
    "expose" in error &&
    error.expose === true &&
    "status" in error &&
    typeof error.status === "number"
  );
}
