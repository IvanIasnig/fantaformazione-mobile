import { HttpException } from "@nestjs/common";

/** Corpo di errore secondo RFC 9457 (application/problem+json). */
export interface ProblemDetails {
  /** URI che identifica il tipo di problema; "about:blank" per gli errori HTTP generici. */
  type: string;
  title: string;
  status: number;
  detail?: string;
  /** Membri di estensione specifici del problema (es. currentVersion su un conflitto di versione). */
  [extension: string]: unknown;
}

/**
 * Errore di dominio con un tipo stabile su cui il client può fare affidamento.
 *
 * @example
 * throw new ProblemDetailsException({
 *   type: "https://<dominio>/problems/squad-version-conflict",
 *   title: "La rosa è stata modificata",
 *   status: HttpStatus.CONFLICT,
 *   detail: "Aggiorna la rosa e riprova.",
 *   currentVersion: 12,
 * });
 */
export class ProblemDetailsException extends HttpException {
  constructor(readonly problem: ProblemDetails) {
    super(problem, problem.status);
  }
}
