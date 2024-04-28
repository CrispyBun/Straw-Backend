import client from "./client";
import tstypes from '../types/express/index';

class BoardRepository {
    async exists(id: number) {
        const board = await client.query('SELECT COUNT(*) FROM "board" WHERE "id" = $1', [id]);
        if (board.rows[0].count > 0) return true;
        return false;
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

    async add(data: {name: string, type?: tstypes.BoardType}) {
        const name = data.name
        const type = data.type || 'usermade'
        const result = await client.query('INSERT INTO "board" ("name", "type") VALUES ($1, $2) RETURNING "id"', [name, type]);
        return result.rows[0].id;
    }
}

export default new BoardRepository();