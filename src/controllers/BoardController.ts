import express from 'express';
import boardRepository from '../database/BoardRepository';
import builder from '../response/ResponseBuilder';

class BoardController {
    async getBoard(req: express.Request, res: express.Response) {
        if (!req.parsedParams.boardId) throw new Error();

        const exists = await boardRepository.exists(req.parsedParams.boardId);
        if (!exists) {
            builder
            .badRequest()
            .setMessage(`Board with ID ${req.parsedParams.boardId} does not exist`)
            .send(res);
            return;
        }

        const board = await boardRepository.get(req.parsedParams.boardId);
        builder
        .success()
        .setData(board)
        .send(res);
    }

    async getBoards(req: express.Request, res: express.Response) {
        const boards = await boardRepository.getMany(req.pagination.skip, req.pagination.limit, req.parsedQuery.boardType);
        const boardCount = await boardRepository.getCount();
        builder
        .success()
        .setData(boards)
        .addMeta("count", boardCount)
        .send(res);
    }

    async addBoard(req: express.Request, res: express.Response) {
        if (!req.parsedBody.boardName) throw new Error();
        if (req.parsedBody.boardSummary === undefined) throw new Error();
        if (!req.parsedHeaders.verifiedUserId) throw new Error();
        const id = await boardRepository.add({
            name: req.parsedBody.boardName,
            summary: req.parsedBody.boardSummary,
            ownerId: req.parsedHeaders.verifiedUserId
        });
        builder
        .success()
        .setData({id: id})
        .send(res);
    }
}

export default new BoardController();