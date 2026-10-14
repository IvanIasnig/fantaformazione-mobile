import express from "express";
import playerRoutes from "./routes/playerRoutes";
import { errorHandler } from "./utils/apiHandler";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import myTeamRoutes from "./routes/myTeamRoutes";

const app = express();
dotenv.config();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/players", playerRoutes);
app.use("/my-team", myTeamRoutes);
app.use(errorHandler);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
