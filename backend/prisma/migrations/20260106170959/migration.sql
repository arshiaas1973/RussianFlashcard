-- CreateTable
CREATE TABLE "flashcards" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "description" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "translations" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "language" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "translations_on_flashcards" (
    "flashcardId" BIGINT NOT NULL,
    "translationId" BIGINT NOT NULL,

    PRIMARY KEY ("flashcardId", "translationId"),
    CONSTRAINT "translations_on_flashcards_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "flashcards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "translations_on_flashcards_translationId_fkey" FOREIGN KEY ("translationId") REFERENCES "translations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
