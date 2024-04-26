import client from "../client";

class BoardRepository {
    async getMany(skip: number = 0, limit: number = 10) {
        const boards = await client.query('SELECT * FROM "board" LIMIT $1 OFFSET $2', [limit, skip]);
        return boards.rows;
    }
}

export default new BoardRepository();