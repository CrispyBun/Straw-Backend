import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';

const stringSchema = joi.string().valid('official', 'usermade', 'profile');

const schema = joi.object({
    type: joi.array().items(stringSchema).unique()
});

const handleBoardTypes = () => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (typeof req.query.type === "string") req.query.type = [req.query.type];

        const result = validateSchema({type: req.query.type}, schema, res);
        if (!result) return;

        req.boardData.type = result.type;

        next();
    }
}

export default handleBoardTypes;