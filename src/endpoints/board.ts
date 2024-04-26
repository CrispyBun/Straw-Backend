import express from 'express';
import boardRepository from '../database/repositories/board';
import handlePagination from '../middleware/handlePagination';
const board = express.Router();

board.get("/", handlePagination(10, 0), async (req, res) => {
    const boards = await boardRepository.getMany(req.pagination.skip, req.pagination.limit);
    res.json(boards);
});

export default board