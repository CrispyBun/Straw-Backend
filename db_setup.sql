DROP TABLE IF EXISTS "board" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;
DROP TABLE IF EXISTS "post" CASCADE;

DROP TYPE IF EXISTS "board_type";

CREATE TYPE "board_type" AS ENUM ('official', 'usermade', 'profile');

CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "url" varchar(64) NOT NULL UNIQUE,
    "username" varchar(64) NOT NULL UNIQUE,
    "email" varchar(255) NULL UNIQUE,
    "password" char(60) NOT NULL,
    "token_reset" timestamp NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "board" (
    "id" SERIAL NOT NULL,
    "url" varchar(64) NOT NULL UNIQUE,
    "name" varchar(128) NOT NULL,
    "summary" varchar(128) NOT NULL,
    "type" board_type NOT NULL DEFAULT 'usermade',
    "owner" int NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("owner") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "author" int NOT NULL,
    "board" int NOT NULL,
    "text_content" text,
    "attachment_content" text,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("board") REFERENCES "board" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY ("author") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Initial official boards
INSERT INTO "board" ("name", "summary", "url", "type")
VALUES ('General', 'A generic board for any topic', 'general', 'official');

INSERT INTO "board" ("name", "summary", "url", "type")
VALUES ('Gaming', 'A videogame focused board', 'gaming', 'official');

INSERT INTO "board" ("name", "summary", "url", "type")
VALUES ('Straw', 'A place for discussing the Straw website', 'straw', 'official');

INSERT INTO "board" ("name", "summary", "url", "type")
VALUES ('Random', '', 'random', 'official');