import client from "./client";
import tstypes from '../types/express/index';

class BoardRepository {
    async exists(id: number) {
        const board = await client.query('SELECT EXISTS(SELECT 1 FROM "board" WHERE "id" = $1)', [id]);
        return board.rows[0].exists;
    }

    async urlExists(url: string) {
        const urlExists = await client.query('SELECT EXISTS(SELECT 1 FROM "board" WHERE "url" = $1)', [url]);
        return urlExists.rows[0].exists;
    }

    async getCount() {
        const result = await client.query('SELECT COUNT(*) FROM "board"');
        return Number(result.rows[0].count);
    }

    async get(id: number) {
        const board = await client.query('SELECT * FROM "board" WHERE "id" = $1', [id]);
        return board.rows[0];
    }

    async getMany(skip: number = 0, limit: number = 10, types?: tstypes.BoardType[]) {
        let boards;
        if (types) {
            boards = await client.query('SELECT * FROM "board" WHERE "type" = ANY ($1) LIMIT $2 OFFSET $3', [types, limit, skip]);
        }
        else {
            boards = await client.query('SELECT * FROM "board" LIMIT $1 OFFSET $2', [limit, skip]);
        }
        return boards.rows;
    }

    async add(data: {name: string, summary: string, url: string, type?: tstypes.BoardType, ownerId?: number}) {
        const name = data.name;
        const summary = data.summary;
        const url = data.url;
        const type = data.type || 'usermade';
        const ownerId = data.ownerId || null;
        const result = await client.query('INSERT INTO "board" ("name", "summary", "url", "type", "owner") VALUES ($1, $2, $3, $4, $5) RETURNING "id"', [name, summary, url, type, ownerId]);
        return result.rows[0].id;
    }
}

export default new BoardRepository();