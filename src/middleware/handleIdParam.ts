import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';

const schema = joi.object({
    id: joi.number().integer().min(1)
})

const handleIdParam = (paramName: string, field: string) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = validateSchema({id: req.params[paramName]}, schema, res);
        if (!result) return;

        (req.parsedParams as any)[field] = result.id;

        next();
    }
}

const handleBoardIdParam = (paramName: string) => { return handleIdParam(paramName, "boardId") };

export { handleIdParam, handleBoardIdParam };