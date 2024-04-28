import express from 'express';

let responseId = 0;
const logRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.logId = responseId;
    responseId ++;
    next();
}

export default logRequest;