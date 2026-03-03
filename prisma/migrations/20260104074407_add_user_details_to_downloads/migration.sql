/*
  Warnings:

  - You are about to drop the column `userName` on the `Download` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Download" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "catalogueId" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "userEmail" TEXT,
    "companyName" TEXT,
    "userPhone" TEXT,
    "country" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "downloadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Download_catalogueId_fkey" FOREIGN KEY ("catalogueId") REFERENCES "Catalogue" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Download" ("catalogueId", "downloadedAt", "id", "ipAddress", "userAgent", "userEmail", "userPhone") SELECT "catalogueId", "downloadedAt", "id", "ipAddress", "userAgent", "userEmail", "userPhone" FROM "Download";
DROP TABLE "Download";
ALTER TABLE "new_Download" RENAME TO "Download";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
