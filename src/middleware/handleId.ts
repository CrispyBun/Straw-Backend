import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';

const schema = joi.object({
    id: joi.number().integer().min(1)
})

const handleId = (paramName: string, field: string) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = validateSchema({id: req.params[paramName]}, schema, res);
        if (!result) return;

        (req as any)[field].id = result.id;

        next();
    }
}

const handleBoardId = (paramName: string) => { return handleId(paramName, "boardData") };

export { handleId, handleBoardId };