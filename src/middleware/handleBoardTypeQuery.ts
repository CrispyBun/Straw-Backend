import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';
import stringSchema from './joischemas/boardType'; 

const schema = joi.object({
    type: joi.array().items(stringSchema).unique()
});

const handleBoardType = () => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (typeof req.query.type === "string") req.query.type = [req.query.type];

        const result = validateSchema({type: req.query.type}, schema, res);
        if (!result) return;

        req.parsedQuery.boardType = result.type;

        next();
    }
}

export default handleBoardType;