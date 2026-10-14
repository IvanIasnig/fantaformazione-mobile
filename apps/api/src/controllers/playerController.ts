import { NextFunction, Request, Response } from "express";
import { importPlayersFromApi } from "../services/playerImportService";
import { prisma } from "../lib/db";
import { ApiError } from "../utils/apiError";
import { success } from "../utils/apiResponse";
import { logger } from "../utils/logger";

// --- funzione GET /players/:id/stats ---
export async function importPlayers(_: Request, res: Response) {
  res.json({ message: "Import avviato" });

  importPlayersFromApi()
    .then(() => logger.info("Import completato"))
    .catch(err => logger.error(err, "Errore durante import"));
}

// --- funzione GET /players/:id/stats ---
export async function getPlayerStats(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  logger.info(`Richiesta stats per player ${id}`);

  try {
    const player = await prisma.player.findUnique({
      where: { id },
      include: {
        statistics: {
          include: {
            games: true,
            substitutes: true,
            shots: true,
            goals: true,
            passes: true,
            tackles: true,
            duels: true,
            dribbles: true,
            fouls: true,
            cards: true,
            penalty: true,
            team: true,
            league: true,
          },
        },
      },
    });

    if (!player) {
      logger.warn(`Player ${id} non trovato`);
      throw new ApiError("Giocatore non trovato", 404);
    }

    logger.info(`Player ${id} trovato`);
    return success(res, player);
  } catch (err) {
    logger.error(err, `Errore nel recupero statistiche per player ${id}`);
    next(err);
  }
}
