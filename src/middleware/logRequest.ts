import * as express from 'express';
import { logger } from '../logger/loggers';

const logRequest = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.verbose(`Got request: ${req.url}`);
    next();
}

export default logRequest;