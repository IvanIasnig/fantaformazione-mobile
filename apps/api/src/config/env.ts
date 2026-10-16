import { plainToInstance } from "class-transformer";
import {
  IsEnum,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  Min,
  MinLength,
  validateSync,
} from "class-validator";

export enum NodeEnv {
  Development = "development",
  Test = "test",
  Production = "production",
}

const LOG_LEVELS = ["fatal", "error", "warn", "info", "debug", "trace", "silent"] as const;

export class Env {
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv = NodeEnv.Development;

  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = 3000;

  @IsIn(LOG_LEVELS)
  LOG_LEVEL: (typeof LOG_LEVELS)[number] = "info";

  @Matches(/^postgres(ql)?:\/\//, { message: "DATABASE_URL deve essere un URL postgresql://" })
  DATABASE_URL: string;

  @IsUrl({ require_tld: false, require_protocol: true })
  SUPABASE_URL: string;

  @IsOptional()
  @IsString()
  @MinLength(32)
  SUPABASE_JWT_SECRET?: string;
}

/** Valida le variabili d'ambiente all'avvio: con una configurazione errata l'app non parte. */
export function validateEnv(config: Record<string, unknown>): Env {
  const env = plainToInstance(Env, config, { enableImplicitConversion: true });
  const errors = validateSync(env, { skipMissingProperties: false });
  if (errors.length > 0) {
    const details = errors.flatMap(error => Object.values(error.constraints ?? {}));
    throw new Error(`Configurazione non valida:\n- ${details.join("\n- ")}`);
  }
  return env;
}
