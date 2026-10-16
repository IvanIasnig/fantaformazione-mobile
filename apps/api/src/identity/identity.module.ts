import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Env } from "../config/env.js";
import { MeController } from "./me.controller.js";
import { ProfilesService } from "./profiles.service.js";
import { SupabaseTokenVerifier } from "./supabase-token.verifier.js";

@Module({
  controllers: [MeController],
  providers: [
    ProfilesService,
    {
      provide: SupabaseTokenVerifier,
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env, true>) =>
        new SupabaseTokenVerifier({
          supabaseUrl: config.get("SUPABASE_URL", { infer: true }),
          jwtSecret: config.get("SUPABASE_JWT_SECRET", { infer: true }),
        }),
    },
  ],
  exports: [SupabaseTokenVerifier],
})
export class IdentityModule {}
