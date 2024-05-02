import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';

const stringSchema = joi.string().max(64, 'utf8');

const schema = joi.object({
    summary: stringSchema
});

const schemaRequired = joi.object({
    summary: stringSchema.required()
});

const handleBoardSummary = (optional?: boolean) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = validateSchema({summary: req.body.summary}, optional ? schema : schemaRequired, res);
        if (!result) return;

        req.boardData.summary = result.summary;

        next();
    }
}

export default handleBoardSummary;