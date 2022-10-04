-- CreateTable
CREATE TABLE "Thing" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "checked" BOOLEAN DEFAULT false
);
