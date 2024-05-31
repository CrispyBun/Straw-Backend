import express from 'express';
import joi from 'joi';
import builder from '../response/ResponseBuilder';

const schema = joi.object({
    id: joi.number().integer().min(1)
})

const handleIdParam = (paramName: string, idField: string, urlField?: string) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const id = req.params[paramName];
        if (id === undefined) throw new Error("Invalid param name");

        // URL IDs
        if (urlField !== undefined && id.length >= 5 && id.substring(0, 4) === "url-") {
            (req.parsedParams as any)[urlField] = id.substring(4);
            return next();
        }

        // Regular IDs
        const result = schema.validate({id: req.params[paramName]});
        if (result.error) {
            builder
            .badRequest()
            .setMessage("ID is not in the correct format")
            .send(res);
            return;
        }
        (req.parsedParams as any)[idField] = result.value.id;

        next();
    }
}

const handleBoardIdParam = (paramName: string) => { return handleIdParam(paramName, "boardId", "boardUrl") };
const handleUserIdParam  = (paramName: string) => { return handleIdParam(paramName, "userId") };

export { handleIdParam, handleBoardIdParam, handleUserIdParam };