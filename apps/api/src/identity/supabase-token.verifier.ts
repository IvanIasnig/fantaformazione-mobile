import { createRemoteJWKSet, jwtVerify, type JWTVerifyGetKey } from "jose";
import type { AuthUser } from "./auth-user.js";

export interface SupabaseTokenVerifierOptions {
  supabaseUrl: string;
  /** JWT secret legacy (HS256). Senza, si accettano solo token firmati con chiavi asimmetriche. */
  jwtSecret?: string | undefined;
}

const AUDIENCE = "authenticated";
const ASYMMETRIC_ALGORITHMS = ["ES256", "RS256"];

/**
 * Verifica gli access token di Supabase Auth: firma, issuer, audience e scadenza.
 * Supabase firma con chiavi asimmetriche (ES256/RS256) pubblicate nel JWKS del progetto: jose le
 * scarica, le tiene in cache e segue le rotazioni. HS256 resta per i progetti con il secret legacy.
 */
export class SupabaseTokenVerifier {
  private readonly issuer: string;
  private readonly algorithms: string[];
  private readonly getKey: JWTVerifyGetKey;

  constructor({ supabaseUrl, jwtSecret }: SupabaseTokenVerifierOptions) {
    this.issuer = new URL("/auth/v1", supabaseUrl).href;
    const jwks = createRemoteJWKSet(new URL("/auth/v1/.well-known/jwks.json", supabaseUrl));
    const hmacKey = jwtSecret ? new TextEncoder().encode(jwtSecret) : undefined;

    // Senza secret HS256 non è ammesso: jose lo scarta prima di chiedere la chiave
    this.algorithms = hmacKey ? ["HS256", ...ASYMMETRIC_ALGORITHMS] : ASYMMETRIC_ALGORITHMS;
    this.getKey = (header, token) =>
      header.alg === "HS256" && hmacKey ? hmacKey : jwks(header, token);
  }

  async verify(token: string): Promise<AuthUser> {
    const { payload } = await jwtVerify(token, this.getKey, {
      issuer: this.issuer,
      audience: AUDIENCE,
      algorithms: this.algorithms,
      requiredClaims: ["exp", "sub"],
    });
    if (typeof payload.sub !== "string") {
      throw new Error("Claim sub non valido");
    }
    return {
      id: payload.sub,
      email: typeof payload.email === "string" ? payload.email : undefined,
    };
  }
}
