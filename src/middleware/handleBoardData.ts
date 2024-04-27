import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';

const stringSchema = joi.string().valid('official', 'usermade', 'profile');

const schema = joi.object({
    types: joi.array().items(stringSchema).unique()
});

const handleBoardData = () => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(req.query.types);
        if (typeof req.query.types === "string") req.query.types = [req.query.types];

        const result = validateSchema({types: req.query.types}, schema, res);
        if (!result) return;

        req.boardData = {
            types: result.types
        };

        next();
    }
}

export default handleBoardData;