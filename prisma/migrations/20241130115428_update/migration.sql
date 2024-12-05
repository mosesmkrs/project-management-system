-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Priority" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Priority" ("id", "name", "projectId") SELECT "id", "name", "projectId" FROM "Priority";
DROP TABLE "Priority";
ALTER TABLE "new_Priority" RENAME TO "Priority";
CREATE UNIQUE INDEX "Priority_name_key" ON "Priority"("name");
CREATE INDEX "Priority_projectId_idx" ON "Priority"("projectId");
CREATE TABLE "new_Status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Status" ("id", "name", "projectId") SELECT "id", "name", "projectId" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
CREATE UNIQUE INDEX "Status_name_key" ON "Status"("name");
CREATE INDEX "Status_projectId_idx" ON "Status"("projectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
