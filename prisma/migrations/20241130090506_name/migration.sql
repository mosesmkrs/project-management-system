/*
  Warnings:

  - You are about to drop the column `level` on the `Priority` table. All the data in the column will be lost.
  - Added the required column `name` to the `Priority` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Priority" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL
);
INSERT INTO "new_Priority" ("id", "projectId") SELECT "id", "projectId" FROM "Priority";
DROP TABLE "Priority";
ALTER TABLE "new_Priority" RENAME TO "Priority";
CREATE UNIQUE INDEX "Priority_name_key" ON "Priority"("name");
CREATE INDEX "Priority_projectId_idx" ON "Priority"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
