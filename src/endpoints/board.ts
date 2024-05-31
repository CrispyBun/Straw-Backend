import express from 'express';
import controller from '../controllers/BoardController';
import handleBodyField from '../middleware/handleBodyField';
import handlePaginationQuery from '../middleware/handlePaginationQuery';
import handleBoardTypeQuery from '../middleware/handleBoardTypeQuery';
import verifyUser from '../middleware/verifyUser';
import { handleBoardIdParam } from '../middleware/handleIdParam';
const board = express.Router();

board.get("/", handlePaginationQuery(50, 1024, 0), handleBoardTypeQuery(), (req, res) => {
    controller.getBoards(req, res);
});

board.get("/:id", handleBoardIdParam("id"), (req, res) => {
    controller.getBoard(req, res);
});

board.post("/", verifyUser(), handleBodyField("boardName"), handleBodyField("boardSummary"), (req, res) => {
    controller.addBoard(req, res);
});

export default board