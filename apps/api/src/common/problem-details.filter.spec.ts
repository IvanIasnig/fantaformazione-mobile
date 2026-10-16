import { ArgumentsHost, BadRequestException, HttpStatus, Logger } from "@nestjs/common";
import { ProblemDetailsException } from "./problem-details.exception.js";
import { ProblemDetailsFilter } from "./problem-details.filter.js";

class FakeResponse {
  statusCode?: number;
  contentType?: string;
  body?: unknown;

  status(code: number): this {
    this.statusCode = code;
    return this;
  }

  type(value: string): this {
    this.contentType = value;
    return this;
  }

  json(body: unknown): this {
    this.body = body;
    return this;
  }
}

function handle(exception: unknown): FakeResponse {
  const response = new FakeResponse();
  const request = { originalUrl: "/v1/squads", id: "req-1" };
  const host = {
    switchToHttp: () => ({ getRequest: () => request, getResponse: () => response }),
  } as unknown as ArgumentsHost;
  new ProblemDetailsFilter().catch(exception, host);
  return response;
}

describe("ProblemDetailsFilter", () => {
  it("non espone i dettagli di un errore inatteso", () => {
    vi.spyOn(Logger.prototype, "error").mockImplementation(() => undefined);

    const response = handle(new Error("connection refused at 10.0.0.12:5432"));

    expect(response.statusCode).toBe(500);
    expect(response.contentType).toBe("application/problem+json");
    expect(response.body).toEqual({
      type: "about:blank",
      title: "Internal Server Error",
      status: 500,
      instance: "/v1/squads",
      traceId: "req-1",
    });
  });

  it("riporta gli errori di validazione in `errors`", () => {
    const response = handle(new BadRequestException(["name must be a string"]));

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({
      title: "Bad Request",
      errors: ["name must be a string"],
    });
  });

  it("mantiene tipo ed estensioni dei problemi di dominio", () => {
    const response = handle(
      new ProblemDetailsException({
        type: "https://example.com/problems/squad-version-conflict",
        title: "La rosa è stata modificata",
        status: HttpStatus.CONFLICT,
        currentVersion: 12,
      }),
    );

    expect(response.statusCode).toBe(409);
    expect(response.body).toMatchObject({
      type: "https://example.com/problems/squad-version-conflict",
      currentVersion: 12,
      traceId: "req-1",
    });
  });
});
