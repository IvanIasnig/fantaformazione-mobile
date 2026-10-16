import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import type { App } from "supertest/types.js";
import { AppModule } from "../src/app.module.js";
import { configureApp } from "../src/app.setup.js";
import type { ProblemDetails } from "../src/common/problem-details.exception.js";

type ProblemResponse = ProblemDetails & { instance: string; traceId: string };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

// Copre il comportamento HTTP che non richiede il database
describe("App (e2e)", () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /health/live è pubblico", async () => {
    await request(app.getHttpServer()).get("/health/live").expect(200, { status: "ok" });
  });

  it("GET /v1/me senza token risponde 401 in formato problem+json", async () => {
    const response = await request(app.getHttpServer())
      .get("/v1/me")
      .expect(401)
      .expect("Content-Type", /application\/problem\+json/);

    const problem = response.body as ProblemResponse;
    expect(problem).toMatchObject({
      type: "about:blank",
      title: "Unauthorized",
      status: 401,
      instance: "/v1/me",
    });
    expect(problem.traceId).toMatch(UUID);
    expect(problem.traceId).toBe(response.headers["x-request-id"]);
  });

  it("GET /v1/me con un token non valido risponde 401", async () => {
    await request(app.getHttpServer())
      .get("/v1/me")
      .set("Authorization", "Bearer not-a-jwt")
      .expect(401);
  });

  it("riusa l'x-request-id inviato dal client come traceId", async () => {
    const response = await request(app.getHttpServer())
      .get("/v1/me")
      .set("x-request-id", "mobile-req-123")
      .expect(401);

    expect((response.body as ProblemResponse).traceId).toBe("mobile-req-123");
  });

  it("una route inesistente risponde 404 in formato problem+json", async () => {
    const response = await request(app.getHttpServer()).get("/v1/nope").expect(404);
    expect(response.body).toMatchObject({ title: "Not Found", status: 404 });
  });

  it("un body JSON malformato risponde 400 con traceId", async () => {
    const response = await request(app.getHttpServer())
      .post("/v1/me")
      .set("Content-Type", "application/json")
      .send("{bad")
      .expect(400);

    const problem = response.body as ProblemResponse;
    expect(problem.status).toBe(400);
    expect(problem.traceId).toMatch(UUID);
    expect(problem.traceId).toBe(response.headers["x-request-id"]);
  });

  it("un body oltre il limite risponde 413, non 500", async () => {
    const response = await request(app.getHttpServer())
      .post("/v1/me")
      .set("Content-Type", "application/json")
      .send(JSON.stringify({ payload: "x".repeat(200_000) }))
      .expect(413);

    expect(response.body).toMatchObject({ title: "Payload Too Large", status: 413 });
  });

  it("espone il documento OpenAPI", async () => {
    const response = await request(app.getHttpServer()).get("/docs/openapi.json").expect(200);
    const document = response.body as { paths: Record<string, unknown> };
    expect(Object.keys(document.paths)).toEqual(
      expect.arrayContaining(["/v1/me", "/health/live", "/health/ready"]),
    );
  });
});
