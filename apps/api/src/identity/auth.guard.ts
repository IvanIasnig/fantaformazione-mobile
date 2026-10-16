import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import { Public } from "./auth.decorators.js";
import { SupabaseTokenVerifier } from "./supabase-token.verifier.js";

/**
 * Guard globale: ogni route richiede un access token Supabase valido, salvo quelle con @Public().
 * Supabase autentica, l'API autorizza: i controlli di ownership restano nei singoli use case.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly verifier: SupabaseTokenVerifier,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(Public, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const [scheme, token] = request.headers.authorization?.split(" ") ?? [];
    if (scheme?.toLowerCase() !== "bearer" || !token) {
      throw new UnauthorizedException("Access token mancante.");
    }

    try {
      request.user = await this.verifier.verify(token);
    } catch (error) {
      this.logger.debug(`Access token rifiutato: ${String(error)}`);
      throw new UnauthorizedException("Access token non valido o scaduto.");
    }
    return true;
  }
}
