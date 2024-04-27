import * as express from 'express';
import builder from '../response/ResponseBuilder';

const handlePagination = (defaultLimit: number = 10, defaultSkip: number = 0) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const queryLimit = req.query.limit || defaultLimit;
        const querySkip = req.query.skip || defaultSkip;

        const limit = Number(queryLimit);
        const skip = Number(querySkip);

        if (isNaN(limit)) {
            builder
            .badRequest()
            .setMessage("Limit must be a number")
            .send(res);
        }
        if (isNaN(skip)) {
            builder
            .badRequest()
            .setMessage("Skip must be a number")
            .send(res);
        }

        req.pagination = {
            limit: limit,
            skip: skip
        };
        next();
    }
}

export default handlePagination