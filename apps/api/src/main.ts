import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module.js";
import { configureApp } from "./app.setup.js";
import type { Env } from "./config/env.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  // SIGTERM (deploy, Railway) -> chiusura ordinata: richieste in corso e connessioni al DB
  app.enableShutdownHooks();
  configureApp(app);

  const config = app.get<ConfigService<Env, true>>(ConfigService);
  await app.listen(config.get("PORT", { infer: true }));
}

await bootstrap();
