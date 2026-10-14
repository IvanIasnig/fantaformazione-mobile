import { Router } from "express";
import { myTeamService } from "../services/myTeamService";

const router = Router();

router.post("/add-many", async (req, res) => {
  const { players } = req.body;
  const result = await myTeamService.addPlayers(players);
  res.json(result);
});

router.patch("/sync", async (req, res) => {
  const { players } = req.body;
  const result = await myTeamService.syncPlayers(players);
  res.json(result);
});

router.get("/", async (_req, res) => {
  const players = await myTeamService.listPlayers();
  res.json(players);
});

router.delete("/clear", async (_req, res) => {
  const result = await myTeamService.clearTeam();
  res.json(result);
});

export default router;
