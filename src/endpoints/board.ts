import express from 'express';
import handlePagination from '../middleware/handlePagination';
import handleBoardData from '../middleware/handleBoardData';
import handleBoardType from '../middleware/handleBoardType';
import { handleBoardId } from '../middleware/handleId';
import controller from '../controllers/BoardController';
const board = express.Router();

board.use("/", handleBoardData())

board.get("/", handlePagination(10, 1024, 0), handleBoardType(), (req, res) => {
    controller.getBoards(req, res);
});

board.get("/:id", handleBoardId("id"), (req, res) => {
    controller.getBoard(req, res);
})

export default board