import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';

const stringSchema = joi.string().max(128, 'utf8').min(1);

const schema = joi.object({
    name: stringSchema
});

const schemaRequired = joi.object({
    name: stringSchema.required()
});

const handleBoardName = (optional?: boolean) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = validateSchema({name: req.body.name}, optional ? schema : schemaRequired, res);
        if (!result) return;

        req.boardData.name = result.name;

        next();
    }
}

export default handleBoardName;