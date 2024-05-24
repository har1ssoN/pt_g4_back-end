-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Professor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "disciplinaId" INTEGER NOT NULL
);
INSERT INTO "new_Professor" ("createdAt", "department", "disciplinaId", "id", "name", "updatedAt") SELECT "createdAt", "department", "disciplinaId", "id", "name", "updatedAt" FROM "Professor";
DROP TABLE "Professor";
ALTER TABLE "new_Professor" RENAME TO "Professor";
PRAGMA foreign_key_check("Professor");
PRAGMA foreign_keys=ON;
