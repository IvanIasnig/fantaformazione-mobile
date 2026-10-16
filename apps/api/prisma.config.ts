import { existsSync } from "node:fs";
import { defineConfig } from "prisma/config";

// Prisma non carica il .env da solo
if (existsSync(".env")) process.loadEnvFile(".env");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Connessione diretta (non pooled) per migrate e studio. Niente env() perché lancia
    // un errore se la variabile manca, e `prisma generate` in postinstall/CI non ne ha bisogno.
    url: process.env.DIRECT_URL ?? "",
  },
});
