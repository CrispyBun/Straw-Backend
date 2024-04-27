import express from 'express';
import boardRepository from '../database/BoardRepository';
import builder from '../response/ResponseBuilder';

class BoardController {
    async getBoards(req: express.Request, res: express.Response) {
        const boards = await boardRepository.getMany(req.pagination.skip, req.pagination.limit, req.boardData.types);
        builder
        .success()
        .setData(boards)
        .send(res);
    }
}

export default new BoardController;