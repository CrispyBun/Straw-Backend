DROP TABLE IF EXISTS "board" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "post" CASCADE;

DROP TYPE IF EXISTS "board_type";

CREATE TYPE "board_type" AS ENUM ('official', 'usermade', 'profile');

CREATE TABLE "board" (
    "id" SERIAL NOT NULL,
    "type" board_type NOT NULL DEFAULT 'usermade',
    PRIMARY KEY ("id")
);

CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "author" int NOT NULL,
    "board" int NOT NULL,
    "content" text,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("board") REFERENCES "board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("author") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);