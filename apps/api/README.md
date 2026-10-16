# FantaAI API

Backend di FantaAI: NestJS 12 (modular monolith), Prisma 7 e Supabase (Postgres e Auth).

## Requisiti

- Node.js 22 (≥ 22.22 per la CLI di Nest) e pnpm
- Docker in esecuzione, per lo stack Supabase locale

## Avvio in locale

Dalla root del monorepo:

```bash
pnpm install                              # genera anche il Prisma Client
cp apps/api/.env.example apps/api/.env
pnpm db:start                             # Supabase locale: Postgres, Auth, Studio
pnpm db:migrate                           # applica le migration allo schema `app`
pnpm api                                  # http://localhost:3000
```

Con i valori di default di `supabase start` il `.env.example` funziona così com'è; `pnpm db:status` ristampa URL e chiavi dello stack. Supabase Studio è su http://127.0.0.1:54323, la documentazione OpenAPI su http://localhost:3000/docs.

## Script

Da `apps/api` (oppure dalla root con gli alias `api:*` e `db:*`):

| Script                          | Cosa fa                                                    |
| ------------------------------- | ---------------------------------------------------------- |
| `dev`                           | avvio in watch mode                                        |
| `build` / `start`               | build di produzione e avvio da `dist/`                     |
| `lint` / `typecheck` / `format` | ESLint, `tsc --noEmit`, Prettier                           |
| `test`                          | test unit ed e2e con Vitest (non richiedono il database)   |
| `db:migrate`                    | crea/applica le migration in sviluppo e rigenera il client |
| `db:deploy`                     | applica le migration esistenti (CI, staging, produzione)   |
| `db:reset`                      | ricrea lo schema `app` da zero                             |
| `db:generate`                   | rigenera il Prisma Client in `src/generated/prisma`        |
| `db:studio`                     | Prisma Studio                                              |

## Endpoint

| Metodo | Path                 | Auth   | Note                                                    |
| ------ | -------------------- | ------ | ------------------------------------------------------- |
| GET    | `/health/live`       | no     | liveness: il processo risponde                          |
| GET    | `/health/ready`      | no     | readiness: verifica la connessione al database          |
| GET    | `/v1/me`             | Bearer | profilo dell'utente, creato al primo accesso            |
| GET    | `/docs`              | no     | Swagger UI, non esposta in produzione                   |
| GET    | `/docs/openapi.json` | no     | documento OpenAPI, sorgente del client mobile tipizzato |

## Convenzioni

- **Moduli**: un modulo Nest per area di dominio (oggi `identity`; poi `catalog`, `squads`, `rankings`, `lineups`, `analysis`, `evaluation`, `operations`). Flusso: controller → service (use case) → Prisma. I controller non usano Prisma direttamente.
- **ESM**: il progetto è `"type": "module"`; gli import relativi usano l'estensione `.js` anche verso file `.ts`.
- **Auth**: Supabase autentica, l'API autorizza. `AuthGuard` è globale: ogni route richiede `Authorization: Bearer <access token Supabase>`, salvo quelle marcate `@Public()`. L'utente si legge con `@CurrentUser()`. Supabase, sia in locale sia in cloud, firma i token con chiavi asimmetriche (ES256): l'API li verifica con il JWKS pubblico del progetto, senza secret condivisi. `SUPABASE_JWT_SECRET` serve solo per un progetto che usa ancora il JWT secret legacy (HS256). I controlli di ownership su rose e formazioni restano nei singoli use case.
- **Errori**: ogni errore esce come `application/problem+json` (RFC 9457) con `traceId` uguale all'header `x-request-id`. Gli errori inattesi diventano un 500 generico: i dettagli vanno solo nei log. Per errori di dominio con un tipo stabile, ad esempio un conflitto di versione della rosa, usare `ProblemDetailsException`.
- **Validazione**: `ValidationPipe` globale con `whitelist` e `forbidNonWhitelisted`. I DTO in ingresso si descrivono con class-validator e le proprietà non dichiarate vengono rifiutate. Il plugin `@nestjs/swagger` (in `nest-cli.json`) documenta i DTO a partire dai tipi TypeScript e dai commenti.
- **Versioning**: le route di dominio stanno sotto `/v1`; un breaking change richiede una nuova versione.
- **Database**: Prisma 7 con driver adapter `pg`. Le tabelle vivono nello schema Postgres `app`, non in `public`: la Data API di Supabase non lo espone, quindi il mobile non può leggere o scrivere i dati di dominio direttamente e passa sempre dall'API. Tabelle e colonne in snake_case tramite `@@map`/`@map`.
- **Config**: le variabili d'ambiente sono validate all'avvio (`src/config/env.ts`). Se ne manca una l'app non parte.
- **Log**: JSON strutturati con pino (leggibili in sviluppo). Ogni richiesta ha `req.id` e `userId`; gli header `authorization` e `cookie` sono oscurati.

## Database e migration

- `DATABASE_URL` è usato dall'app a runtime; in cloud punterà al pooler di Supabase (Supavisor). `DIRECT_URL` è la connessione diretta usata dalla CLI Prisma per migrate e Studio. In locale coincidono.
- Workflow: modifica `prisma/schema.prisma` → `pnpm db:migrate` (chiede il nome della migration) → rileggi l'SQL generato in `prisma/migrations` → committa schema e migration insieme.
- Le migration in produzione si applicano con `db:deploy` e devono restare compatibili con la versione dell'API già in esecuzione (expand → backfill → switch → contract).
- `supabase db reset` cancella anche lo schema `app`: dopo, rilancia `pnpm db:migrate`.
