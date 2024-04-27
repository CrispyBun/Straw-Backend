import * as express from 'express';
import joi from 'joi';
import builder from '../response/ResponseBuilder';

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

        const validated = schema.validate({limit: queryLimit, skip: querySkip});
        if (validated.error) {
            builder
            .badRequest()
            .setMessage(validated.error.message)
            .send(res);
            return;
        }

        req.pagination = {
            limit: validated.value.limit,
            skip: validated.value.skip
        }

        next();
    }
}

export default handlePagination