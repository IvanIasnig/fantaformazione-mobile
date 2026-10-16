import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import type { AuthUser } from "./auth-user.js";
import { CurrentUser } from "./auth.decorators.js";
import { ProfileDto } from "./profile.dto.js";
import { ProfilesService } from "./profiles.service.js";

@ApiTags("identity")
@ApiBearerAuth()
@Controller("me")
export class MeController {
  constructor(private readonly profiles: ProfilesService) {}

  /** Profilo dell'utente autenticato, creato al primo accesso. */
  @Get()
  async getMe(@CurrentUser() user: AuthUser): Promise<ProfileDto> {
    const profile = await this.profiles.getOrCreate(user.id);
    return ProfileDto.fromProfile(profile);
  }
}
