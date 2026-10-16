import {
  Controller,
  Get,
  Logger,
  ServiceUnavailableException,
  VERSION_NEUTRAL,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../identity/auth.decorators.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { HealthStatus } from "./health-status.dto.js";

@Public()
@ApiTags("health")
@Controller({ path: "health", version: VERSION_NEUTRAL })
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly prisma: PrismaService) {}

  /** Liveness: il processo risponde. Non controlla dipendenze esterne. */
  @Get("live")
  live(): HealthStatus {
    return { status: "ok" };
  }

  /** Readiness: l'istanza può servire traffico, il database è raggiungibile. */
  @Get("ready")
  async ready(): Promise<HealthStatus> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      this.logger.warn(`Database non raggiungibile: ${String(error)}`);
      throw new ServiceUnavailableException("Database non raggiungibile.");
    }
    return { status: "ok" };
  }
}
