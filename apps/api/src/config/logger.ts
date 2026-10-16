import type { ConfigService } from "@nestjs/config";
import type { Request } from "express";
import type { Params } from "nestjs-pino";
import { randomUUID } from "node:crypto";
import { NodeEnv, type Env } from "./env.js";

/** Log JSON strutturati, con request id e utente per correlare richieste, errori e job. */
export function loggerConfig(config: ConfigService<Env, true>): Params {
  const isDevelopment = config.get("NODE_ENV", { infer: true }) === NodeEnv.Development;

  return {
    pinoHttp: {
      level: config.get("LOG_LEVEL", { infer: true }),
      transport: isDevelopment
        ? { target: "pino-pretty", options: { singleLine: true } }
        : undefined,
      // L'id è già assegnato da assignRequestId (vedi configureApp)
      genReqId: req => req.id ?? randomUUID(),
      customProps: req => ({ userId: (req as Request).user?.id }),
      // Niente header (token, cookie) né IP del client: solo ciò che serve a correlare
      serializers: {
        req: (req: { id: string; method: string; url: string }) => ({
          id: req.id,
          method: req.method,
          url: req.url,
        }),
        res: (res: { statusCode: number }) => ({ statusCode: res.statusCode }),
      },
      // I probe di liveness/readiness arrivano ogni pochi secondi: niente rumore nei log
      autoLogging: { ignore: req => req.url?.startsWith("/health") ?? false },
    },
  };
}
