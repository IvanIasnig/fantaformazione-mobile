import { prisma } from "../lib/db";

export const myTeamRepository = {
  async addPlayers(playerIds: number[]) {
    const data = playerIds.map(id => ({ playerId: id }));
    return prisma.myTeamPlayer.createMany({
      data,
    });
  },

  async listPlayers() {
    return prisma.myTeamPlayer.findMany({
      include: { player: true },
    });
  },

  async listPlayerIds() {
    const rows = await prisma.myTeamPlayer.findMany({
      select: { playerId: true },
    });
    return rows.map(r => r.playerId);
  },

  async removePlayers(playerIds: number[]) {
    return prisma.myTeamPlayer.deleteMany({
      where: { playerId: { in: playerIds } },
    });
  },

  async clearTeam() {
    return prisma.myTeamPlayer.deleteMany({});
  },
};
