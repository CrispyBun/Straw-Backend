import express from 'express';

let responseId = 0;
const logRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.logId = responseId;
    responseId ++;
    res.requestTimestamp = new Date();
    next();
}

export default logRequest;