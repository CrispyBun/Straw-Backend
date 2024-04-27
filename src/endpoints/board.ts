import express from 'express';
import handlePagination from '../middleware/handlePagination';
import handleBoardData from '../middleware/handleBoardData';
import handleBoardTypes from '../middleware/handleBoardTypes';
import BoardController from '../controllers/BoardController';
const board = express.Router();

let controller: BoardController;
board.use("/", handleBoardData(), (req, res, next) => {
    controller = new BoardController(req, res);
    next();
})

board.get("/", handlePagination(10, 0), handleBoardTypes(), () => {
    controller.getBoards();
});

export default board