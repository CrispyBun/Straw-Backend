import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';

const schema = joi.object({
    limit: joi.number()
        .integer()
        .min(0),
    
    skip: joi.number()
        .integer()
        .min(0)
});

const handlePagination = (defaultLimit: number = 10, defaultSkip: number = 0) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const queryLimit = req.query.limit || defaultLimit;
        const querySkip = req.query.skip || defaultSkip;

        const result = validateSchema({limit: queryLimit, skip: querySkip}, schema, res);
        if (!result) return;

        req.pagination = {
            limit: result.limit,
            skip: result.skip
        }

        next();
    }
}

export default handlePagination