-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "age" INTEGER,
    "birthDate" TEXT,
    "birthPlace" TEXT,
    "birthCountry" TEXT,
    "nationality" TEXT,
    "height" TEXT,
    "weight" TEXT,
    "injured" BOOLEAN,
    "photo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Statistic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "leagueId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Statistic_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Statistic_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Statistic_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Team" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "League" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "season" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "appearences" INTEGER,
    "lineups" INTEGER,
    "minutes" INTEGER,
    "number" INTEGER,
    "position" TEXT,
    "rating" TEXT,
    "captain" BOOLEAN,
    CONSTRAINT "Games_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Substitutes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "in_" INTEGER,
    "out" INTEGER,
    "bench" INTEGER,
    CONSTRAINT "Substitutes_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Shots" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "total" INTEGER,
    "onTarget" INTEGER,
    CONSTRAINT "Shots_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Goals" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "total" INTEGER,
    "conceded" INTEGER,
    "assists" INTEGER,
    "saves" INTEGER,
    CONSTRAINT "Goals_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Passes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "total" INTEGER,
    "key" INTEGER,
    "accuracy" INTEGER,
    CONSTRAINT "Passes_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tackles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "total" INTEGER,
    "blocks" INTEGER,
    "interceptions" INTEGER,
    CONSTRAINT "Tackles_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Duels" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "total" INTEGER,
    "won" INTEGER,
    CONSTRAINT "Duels_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Dribbles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "attempts" INTEGER,
    "success" INTEGER,
    "past" INTEGER,
    CONSTRAINT "Dribbles_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fouls" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "drawn" INTEGER,
    "committed" INTEGER,
    CONSTRAINT "Fouls_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "yellow" INTEGER,
    "yellowred" INTEGER,
    "red" INTEGER,
    CONSTRAINT "Cards_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Penalty" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "statisticId" INTEGER NOT NULL,
    "won" INTEGER,
    "commited" INTEGER,
    "scored" INTEGER,
    "missed" INTEGER,
    "saved" INTEGER,
    CONSTRAINT "Penalty_statisticId_fkey" FOREIGN KEY ("statisticId") REFERENCES "Statistic" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MyTeamPlayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    CONSTRAINT "MyTeamPlayer_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_apiId_key" ON "Player"("apiId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_apiId_key" ON "Team"("apiId");

-- CreateIndex
CREATE UNIQUE INDEX "League_apiId_key" ON "League"("apiId");

-- CreateIndex
CREATE UNIQUE INDEX "Games_statisticId_key" ON "Games"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Substitutes_statisticId_key" ON "Substitutes"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Shots_statisticId_key" ON "Shots"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Goals_statisticId_key" ON "Goals"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Passes_statisticId_key" ON "Passes"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Tackles_statisticId_key" ON "Tackles"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Duels_statisticId_key" ON "Duels"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Dribbles_statisticId_key" ON "Dribbles"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Fouls_statisticId_key" ON "Fouls"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Cards_statisticId_key" ON "Cards"("statisticId");

-- CreateIndex
CREATE UNIQUE INDEX "Penalty_statisticId_key" ON "Penalty"("statisticId");
