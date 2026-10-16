# FantaAI

Monorepo di FantaAI.

## Struttura

- apps/mobile - React Native / Expo
- apps/api - NestJS / Prisma / Supabase ([dettagli](apps/api/README.md))
- packages - codice condiviso
- supabase - configurazione dello stack Supabase locale (Postgres + Auth)

## Installazione

pnpm install

## Mobile

pnpm mobile

## Backend

Richiede Docker in esecuzione per lo stack Supabase locale.

pnpm db:start
pnpm db:migrate
pnpm api

API su http://localhost:3000, documentazione OpenAPI su http://localhost:3000/docs.

## Build backend

pnpm api:build
