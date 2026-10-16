import type { AuthUser } from "../identity/auth-user.js";

declare global {
  namespace Express {
    interface Request {
      /** Impostato da AuthGuard sulle route protette. */
      user?: AuthUser;
    }
  }
}
