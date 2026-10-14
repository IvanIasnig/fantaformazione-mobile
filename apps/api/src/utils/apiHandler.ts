import { NextFunction, Request, Response } from "express";
import { ApiError } from "./apiError";

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      error: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    error: "Errore interno del server",
  });
}
