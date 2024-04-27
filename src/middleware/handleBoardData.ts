import express from 'express';

const handleBoardData = () => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {

        req.boardData = {};

        next();
    }
}

export default handleBoardData;