-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Avaliacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conteudo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    CONSTRAINT "Avaliacao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Avaliacao" ("conteudo", "createdAt", "disciplinaId", "id", "professorId", "updatedAt", "userId") SELECT "conteudo", "createdAt", "disciplinaId", "id", "professorId", "updatedAt", "userId" FROM "Avaliacao";
DROP TABLE "Avaliacao";
ALTER TABLE "new_Avaliacao" RENAME TO "Avaliacao";
CREATE TABLE "new_Comentario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conteudo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "avaliacaoId" INTEGER NOT NULL,
    CONSTRAINT "Comentario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comentario_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comentario" ("avaliacaoId", "conteudo", "createdAt", "id", "updatedAt", "userId") SELECT "avaliacaoId", "conteudo", "createdAt", "id", "updatedAt", "userId" FROM "Comentario";
DROP TABLE "Comentario";
ALTER TABLE "new_Comentario" RENAME TO "Comentario";
PRAGMA foreign_key_check("Avaliacao");
PRAGMA foreign_key_check("Comentario");
PRAGMA foreign_keys=ON;
