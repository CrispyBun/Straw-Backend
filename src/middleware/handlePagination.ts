import * as express from 'express';

const handlePagination = (limit: number = 10, skip: number = 0) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const queryLimit = req.query.limit || limit;
        const querySkip = req.query.skip || skip;
        (req as any).pagination = {
            limit: queryLimit,
            skip: querySkip
        };
        next();
    }
}

export default handlePagination