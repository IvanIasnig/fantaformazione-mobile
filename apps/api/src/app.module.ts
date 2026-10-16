import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";
import { LoggerModule } from "nestjs-pino";
import { ProblemDetailsFilter } from "./common/problem-details.filter.js";
import { validateEnv } from "./config/env.js";
import { loggerConfig } from "./config/logger.js";
import { HealthModule } from "./health/health.module.js";
import { AuthGuard } from "./identity/auth.guard.js";
import { IdentityModule } from "./identity/identity.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true, validate: validateEnv }),
    LoggerModule.forRootAsync({ inject: [ConfigService], useFactory: loggerConfig }),
    PrismaModule,
    HealthModule,
    IdentityModule,
  ],
  providers: [
    // Comportamenti globali, attivi anche nei test e2e che importano AppModule
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_FILTER, useClass: ProblemDetailsFilter },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {}
