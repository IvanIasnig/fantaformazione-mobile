import type { Profile } from "../generated/prisma/client.js";

export class ProfileDto {
  /** Id dell'utente in Supabase Auth */
  id: string;
  displayName: string | null;
  /** Fuso orario IANA usato per deadline e promemoria */
  timezone: string;
  createdAt: Date;

  static fromProfile(profile: Profile): ProfileDto {
    return {
      id: profile.id,
      displayName: profile.displayName,
      timezone: profile.timezone,
      createdAt: profile.createdAt,
    };
  }
}
