-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "display_name" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'Europe/Rome',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);
