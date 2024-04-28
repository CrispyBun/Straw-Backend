import express from 'express';
import builder from '../response/ResponseBuilder';
import { logger } from '../logger/loggers';

export default (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
        return builder
               .badRequest()
               .setMessage("Invalid JSON")
               .send(res);
    }

    logger.error(`Unexpected error: ${err.message}`);
    logger.error(err.stack)

    builder
    .error()
    .send(res);
}