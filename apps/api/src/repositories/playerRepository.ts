import { prisma } from "../lib/db";
import { buildStatistic, mapLeague, mapPlayer, mapTeam } from "../mappers/playerMapper";
import { ApiPlayer } from "../types/footballPlayersStatistics";

export const playerRepository = {
  async save(apiPlayer: ApiPlayer) {
    const data = mapPlayer(apiPlayer.player);

    const player = await prisma.player.upsert({
      where: { apiId: apiPlayer.player.id },
      update: data,
      create: { apiId: apiPlayer.player.id, ...data },
    });

    await prisma.statistic.deleteMany({ where: { playerId: player.id } });

    for (const stat of apiPlayer.statistics) {
      const team = await prisma.team.upsert({
        where: { apiId: stat.team.id },
        update: mapTeam(stat.team),
        create: mapTeam(stat.team),
      });

      const league = await prisma.league.upsert({
        where: { apiId: stat.league.id },
        update: mapLeague(stat.league),
        create: mapLeague(stat.league),
      });

      await prisma.statistic.create({
        data: buildStatistic(player.id, team.id, league.id, stat),
      });
    }
  },
};
