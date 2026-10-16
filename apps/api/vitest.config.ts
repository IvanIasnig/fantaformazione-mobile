import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: "./",
    include: ["src/**/*.spec.ts", "test/**/*.e2e-spec.ts"],
    // Valori fittizi: i test non devono dipendere dal .env locale
    env: {
      NODE_ENV: "test",
      LOG_LEVEL: "silent",
      DATABASE_URL: "postgresql://postgres:postgres@127.0.0.1:54322/postgres?schema=app",
      SUPABASE_URL: "http://127.0.0.1:54321",
    },
  },
});
