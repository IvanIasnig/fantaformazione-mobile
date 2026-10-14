import { Router } from "express";
import { importPlayers } from "../controllers/playerController";
import { getPlayerStats } from "../controllers/playerController";

const router = Router();

router.get("/import", importPlayers);

router.get("/:id/stats", getPlayerStats);

export default router;
