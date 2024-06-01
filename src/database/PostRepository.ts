import client from "./client";
import tstypes from '../types/express/index';

class UserRepository {
    async add(data: {authorId: number, boardId: number, textContent: string}) {
        const authorId = data.authorId;
        const boardId = data.boardId;
        const textContent = data.textContent;
        const result = await client.query('INSERT INTO "post" ("author", "board", "text_content") VALUES ($1, $2, $3) RETURNING "id"', [authorId, boardId, textContent]);
        return result.rows[0].id;
    }
}

export default new UserRepository();