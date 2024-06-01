import client from "./client";
import tstypes from '../types/express/index';

class PostRepository {
    async add(data: {authorId: number, boardId: number, textContent: string}) {
        const authorId = data.authorId;
        const boardId = data.boardId;
        const textContent = data.textContent;
        const result = await client.query('INSERT INTO "post" ("author", "board", "text_content") VALUES ($1, $2, $3) RETURNING "id"', [authorId, boardId, textContent]);
        return result.rows[0].id;
    }

    async getMany(boardId: number, skip: number = 0, limit: number = 10) {
        const posts = await client.query('SELECT * FROM "post" WHERE "board" = $1 ORDER BY "id" DESC LIMIT $2 OFFSET $3', [boardId, limit, skip]);
        return posts.rows;
    }

    async getCount() {
        const result = await client.query('SELECT COUNT(*) FROM "post"');
        return Number(result.rows[0].count);
    }
}

export default new PostRepository();