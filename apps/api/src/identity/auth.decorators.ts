import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import type { AuthUser } from "./auth-user.js";

/** Rende pubblica una route o un intero controller: nessun access token richiesto. */
export const Public = Reflector.createDecorator<void, true>({ transform: () => true });

/** Utente autenticato della richiesta corrente (solo su route protette). */
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser => {
    const request = context.switchToHttp().getRequest<Request>();
    if (!request.user) {
      throw new UnauthorizedException();
    }
    return request.user;
  },
);
