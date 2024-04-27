import client from "./client";
import tstypes from '../types/express/index';

class BoardRepository {
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
}

export default new BoardRepository();