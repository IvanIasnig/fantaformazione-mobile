import { ApiResponse } from "../types/footballPlayersStatistics";
import { logger } from "../utils/logger";
import { playerRepository } from "../repositories/playerRepository";

export async function importPlayersFromApi() {
  let currentPage = 1;
  let totalPages: number | null = null;

  while (totalPages === null || currentPage <= totalPages) {
    const response = await fetch(
      `https://v3.football.api-sports.io/players?league=135&season=2023&page=${currentPage}`,
      {
        headers: {
          "x-apisports-key": process.env.API_FOOTBALL_KEY!,
        },
      },
    );

    const data = (await response.json()) as ApiResponse;

    if (!data.paging || !data.response) {
      logger.error(data);
      break;
    }

    if (currentPage === 1) {
      totalPages = data.paging.total;
    }

    await Promise.all(data.response.map(p => playerRepository.save(p)));

    currentPage++;
  }
}
