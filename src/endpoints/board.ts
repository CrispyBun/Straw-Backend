import express from 'express';
import controller from '../controllers/BoardController';
import handlePagination from '../middleware/handlePagination';
import handleBoardData from '../middleware/handleBoardData';
import handleBoardType from '../middleware/handleBoardType';
import handleBoardName from '../middleware/handleBoardName';
import handleBoardSummary from '../middleware/handleBoardSummary';
import { handleBoardId } from '../middleware/handleId';
const board = express.Router();

board.use("/", handleBoardData());

board.get("/", handlePagination(50, 1024, 0), handleBoardType(), (req, res) => {
    controller.getBoards(req, res);
});

board.get("/:id", handleBoardId("id"), (req, res) => {
    controller.getBoard(req, res);
});

// TODO: verify user
board.post("/", handleBoardName(), handleBoardSummary(), (req, res) => {
    controller.addBoard(req, res);
});

export default board