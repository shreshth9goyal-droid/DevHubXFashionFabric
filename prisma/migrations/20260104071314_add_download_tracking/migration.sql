-- CreateTable
CREATE TABLE "Download" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "catalogueId" TEXT NOT NULL,
    "userName" TEXT,
    "userEmail" TEXT,
    "userPhone" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "downloadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Download_catalogueId_fkey" FOREIGN KEY ("catalogueId") REFERENCES "Catalogue" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
