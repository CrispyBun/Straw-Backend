import * as express from 'express';
import { logger, requestLogger } from '../logger/loggers';

const logRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.verbose(`[<- ${res.logId}] Got request: ${req.url}`);
    requestLogger.info({req: req, res: res});
    next();
}

export default logRequest;