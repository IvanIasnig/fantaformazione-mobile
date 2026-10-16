import { Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PrismaPg } from "@prisma/adapter-pg";
import type { Env } from "../config/env.js";
import { PrismaClient } from "../generated/prisma/client.js";

/**
 * Prisma Client condiviso. La connessione è lazy (prima query): l'app parte anche con il
 * database giù e lo segnala da /health/ready invece di andare in crash all'avvio.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  private static readonly logger = new Logger(PrismaService.name);

  constructor(config: ConfigService<Env, true>) {
    const connectionString = config.get("DATABASE_URL", { infer: true });
    super({
      adapter: new PrismaPg(
        { connectionString, connectionTimeoutMillis: 5_000 },
        {
          // L'adapter non legge ?schema= dall'URL: va passato esplicitamente
          schema: new URL(connectionString).searchParams.get("schema") ?? undefined,
          onPoolError: error =>
            PrismaService.logger.warn(`Errore su una connessione inattiva: ${error.message}`),
        },
      ),
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
