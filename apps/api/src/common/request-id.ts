import type { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

const REQUEST_ID_HEADER = "x-request-id";
const VALID_REQUEST_ID = /^[\w-]{1,64}$/;

/**
 * Assegna l'id della richiesta prima di qualunque altro middleware, body parser compreso, così è
 * presente nei log e nel traceId di ogni errore. Riusa quello del client se ben formato: permette
 * di correlare app e API.
 */
export function assignRequestId(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.headers[REQUEST_ID_HEADER];
  req.id =
    typeof incoming === "string" && VALID_REQUEST_ID.test(incoming) ? incoming : randomUUID();
  res.setHeader(REQUEST_ID_HEADER, req.id);
  next();
}
