import { exportJWK, generateKeyPair, SignJWT } from "jose";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { SupabaseTokenVerifier } from "./supabase-token.verifier.js";

const USER_ID = "7b0c3a4e-2f61-4c2e-9d55-0d6b1b8f6a10";
const EMAIL = "mario@example.com";
const KEY_ID = "test-signing-key";
const LEGACY_SECRET = "legacy-secret-with-at-least-32-characters!";

let supabaseUrl: string;
let signingKey: CryptoKey;
let jwksServer: Server;

// Simula il JWKS che Supabase Auth pubblica, con una chiave ES256 generata per il test
beforeAll(async () => {
  const { publicKey, privateKey } = await generateKeyPair("ES256");
  signingKey = privateKey;
  const jwks = { keys: [{ ...(await exportJWK(publicKey)), kid: KEY_ID, alg: "ES256" }] };

  jwksServer = createServer((req, res) => {
    if (req.url !== "/auth/v1/.well-known/jwks.json") {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "content-type": "application/json" }).end(JSON.stringify(jwks));
  });
  await new Promise<void>(resolve => jwksServer.listen(0, "127.0.0.1", resolve));
  supabaseUrl = `http://127.0.0.1:${(jwksServer.address() as AddressInfo).port}`;
});

afterAll(() => new Promise<void>(resolve => jwksServer.close(() => resolve())));

interface TokenOptions {
  alg?: "ES256" | "HS256";
  secret?: string;
  issuer?: string;
  audience?: string;
  expiresAt?: number;
}

function signToken({
  alg = "ES256",
  secret = LEGACY_SECRET,
  issuer = `${supabaseUrl}/auth/v1`,
  audience = "authenticated",
  expiresAt = Math.floor(Date.now() / 1000) + 3600,
}: TokenOptions = {}): Promise<string> {
  const jwt = new SignJWT({ email: EMAIL, role: "authenticated" })
    .setProtectedHeader(alg === "ES256" ? { alg, kid: KEY_ID } : { alg })
    .setSubject(USER_ID)
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime(expiresAt);
  return alg === "ES256" ? jwt.sign(signingKey) : jwt.sign(new TextEncoder().encode(secret));
}

describe("SupabaseTokenVerifier", () => {
  const verifier = () => new SupabaseTokenVerifier({ supabaseUrl });

  it("accetta un token firmato con una signing key del progetto", async () => {
    await expect(verifier().verify(await signToken())).resolves.toEqual({
      id: USER_ID,
      email: EMAIL,
    });
  });

  it("rifiuta un token scaduto", async () => {
    const token = await signToken({ expiresAt: Math.floor(Date.now() / 1000) - 60 });
    await expect(verifier().verify(token)).rejects.toThrow();
  });

  it("rifiuta un token emesso da un altro progetto", async () => {
    const token = await signToken({ issuer: "https://other.supabase.co/auth/v1" });
    await expect(verifier().verify(token)).rejects.toThrow();
  });

  it("rifiuta un token che non appartiene a un utente autenticato", async () => {
    await expect(verifier().verify(await signToken({ audience: "anon" }))).rejects.toThrow();
  });

  it("rifiuta i token HS256 se il secret legacy non è configurato", async () => {
    await expect(verifier().verify(await signToken({ alg: "HS256" }))).rejects.toThrow(/alg/);
  });

  describe("con il secret legacy configurato", () => {
    const legacyVerifier = () =>
      new SupabaseTokenVerifier({ supabaseUrl, jwtSecret: LEGACY_SECRET });

    it("accetta i token HS256", async () => {
      await expect(legacyVerifier().verify(await signToken({ alg: "HS256" }))).resolves.toEqual({
        id: USER_ID,
        email: EMAIL,
      });
    });

    it("rifiuta i token HS256 firmati con un altro secret", async () => {
      const token = await signToken({
        alg: "HS256",
        secret: "another-secret-with-at-least-32-characters",
      });
      await expect(legacyVerifier().verify(token)).rejects.toThrow();
    });
  });
});
