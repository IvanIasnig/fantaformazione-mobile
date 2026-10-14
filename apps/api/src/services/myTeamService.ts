import { myTeamRepository } from "../repositories/myTeamRepository";

export const myTeamService = {
  addPlayers: (ids: number[]) => myTeamRepository.addPlayers(ids),
  listPlayers: () => myTeamRepository.listPlayers(),
  syncPlayers: async (finalIds: number[]) => {
    const currentIds = await myTeamRepository.listPlayerIds();

    const toAdd = finalIds.filter(id => !currentIds.includes(id));
    const toRemove = currentIds.filter(id => !finalIds.includes(id));

    if (toAdd.length) await myTeamRepository.addPlayers(toAdd);
    if (toRemove.length) await myTeamRepository.removePlayers(toRemove);

    return myTeamRepository.listPlayers();
  },

  clearTeam: () => myTeamRepository.clearTeam(),
};
