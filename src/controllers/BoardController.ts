import express from 'express';
import boardRepository from '../database/BoardRepository';
import builder from '../response/ResponseBuilder';

class BoardController {
    async getBoards(req: express.Request, res: express.Response) {
        const boards = await boardRepository.getMany(req.pagination.skip, req.pagination.limit, req.boardData.types);
        const boardCount = await boardRepository.getCount();
        builder
        .success()
        .setData(boards)
        .addMeta("count", boardCount)
        .send(res);
    }

    async getBoard(req: express.Request, res: express.Response) {
        const exists = await boardRepository.exists(req.boardData.id);
        if (!exists) {
            builder
            .badRequest()
            .setMessage(`Board with ID ${req.boardData.id} does not exist`)
            .send(res);
            return;
        }

        const board = await boardRepository.get(req.boardData.id);
        builder
        .success()
        .setData(board)
        .send(res);
    }
}

export default new BoardController;