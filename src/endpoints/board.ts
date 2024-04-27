import express from 'express';
import handlePagination from '../middleware/handlePagination';
import BoardController from '../controllers/BoardController';
const board = express.Router();

let controller: BoardController;
board.use("/", (req, res, next) => {
    controller = new BoardController(req, res);
    next();
})

board.get("/", handlePagination(10, 0), async (req, res) => {
    controller.getBoards();
});

export default board