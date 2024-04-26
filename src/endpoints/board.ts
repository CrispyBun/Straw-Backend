import express from 'express';
import boardRepository from '../database/repositories/board';
const board = express.Router();

board.get("/", async (req, res) => {
    const boards = await boardRepository.getMany();
    console.log(boards);
    res.json(boards);
});

export default board