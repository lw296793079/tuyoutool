-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feedback" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "contact" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL DEFAULT 'OTHER',
    "priority" TEXT NOT NULL DEFAULT 'NORMAL',
    "title" TEXT,
    "browser" TEXT,
    "device" TEXT,
    "os" TEXT,
    "url" TEXT,
    "assignee" TEXT,
    "response" TEXT,
    "resolvedAt" DATETIME,
    "ip" TEXT,
    "ipLocation" TEXT,
    "screenSize" TEXT,
    "language" TEXT,
    "timeZone" TEXT,
    "referrer" TEXT,
    "routePath" TEXT,
    "userAgent" TEXT,
    "visitTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Feedback" ("assignee", "browser", "category", "contact", "content", "createdAt", "device", "id", "os", "priority", "resolvedAt", "response", "status", "title", "url") SELECT "assignee", "browser", "category", "contact", "content", "createdAt", "device", "id", "os", "priority", "resolvedAt", "response", "status", "title", "url" FROM "Feedback";
DROP TABLE "Feedback";
ALTER TABLE "new_Feedback" RENAME TO "Feedback";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
