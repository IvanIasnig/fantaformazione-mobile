import { INestApplication, VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import helmet from "helmet";
import { assignRequestId } from "./common/request-id.js";
import { NodeEnv, type Env } from "./config/env.js";

/** Configurazione HTTP condivisa da main.ts e dai test e2e. */
export function configureApp(app: INestApplication): void {
  app.use(assignRequestId);
  app.use(helmet());
  // Le route di dominio vivono sotto /v1; /health resta fuori dal versioning
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: "1" });

  const config = app.get<ConfigService<Env, true>>(ConfigService);
  if (config.get("NODE_ENV", { infer: true }) !== NodeEnv.Production) {
    setupOpenApi(app);
  }
}

function setupOpenApi(app: INestApplication): void {
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder().setTitle("FantaAI API").setVersion("1").addBearerAuth().build(),
  );
  // UI su /docs, documento su /docs/openapi.json: è la sorgente del client mobile tipizzato
  SwaggerModule.setup("docs", app, document, { jsonDocumentUrl: "docs/openapi.json" });
}
