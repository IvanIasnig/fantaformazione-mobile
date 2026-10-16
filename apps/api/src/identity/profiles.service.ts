import { Injectable } from "@nestjs/common";
import type { Profile } from "../generated/prisma/client.js";
import { PrismaService } from "../prisma/prisma.service.js";

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  /** Il profilo nasce al primo accesso: l'utente esiste già in Supabase Auth. */
  getOrCreate(userId: string): Promise<Profile> {
    return this.prisma.profile.upsert({
      where: { id: userId },
      create: { id: userId },
      update: {},
    });
  }
}
