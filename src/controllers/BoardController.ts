import express from 'express';
import boardRepository from '../database/BoardRepository';
import builder from '../response/ResponseBuilder';
import generateBoardUrl from '../middleware/helper/generateBoardUrl';

class BoardController {
    async handleIdExists(req: express.Request, res: express.Response) {
        if (!req.parsedParams.boardId) throw new Error();

        const exists = await boardRepository.exists(req.parsedParams.boardId);
        if (!exists) {
            builder
            .badRequest()
            .setMessage(`Board with ID ${req.parsedParams.boardId} does not exist`)
            .send(res);
            return false;
        }

        return true;
    }

    async handleUrlExists(req: express.Request, res: express.Response) {
        if (!req.parsedParams.boardUrl) throw new Error();

        const exists = await boardRepository.urlExists(req.parsedParams.boardUrl);
        if (!exists) {
            builder
            .badRequest()
            .setMessage(`Board with URL "${req.parsedParams.boardUrl}" does not exist`)
            .send(res);
            return false;
        }

        return true;
    }

    async getBoard(req: express.Request, res: express.Response) {
        
        let board;
        if (req.parsedParams.boardId) {
            if (!(await this.handleIdExists(req, res))) return;
            board = await boardRepository.get(req.parsedParams.boardId);
        }
        else if (req.parsedParams.boardUrl) {
            if (!(await this.handleUrlExists(req, res))) return;
            board = await boardRepository.getFromUrl(req.parsedParams.boardUrl);
        }
        if (!board) {
            throw new Error();
        }

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

        let url;
        let urlLength = 0;
        do {
            urlLength ++;
            url = generateBoardUrl(urlLength);
        }
        while (await boardRepository.urlExists(url));

        const id = await boardRepository.add({
            name: req.parsedBody.boardName,
            summary: req.parsedBody.boardSummary,
            ownerId: req.parsedHeaders.verifiedUserId,
            url: url
        });
        builder
        .success()
        .setData({id: id})
        .send(res);
    }
}

export default new BoardController();