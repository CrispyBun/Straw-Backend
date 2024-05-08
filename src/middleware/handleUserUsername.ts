import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';
import stringSchema from './joischemas/userUsername';

const schema = joi.object({
    username: stringSchema
});

const schemaRequired = joi.object({
    username: stringSchema.required()
});

const handleUserUsername = (optional?: boolean) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = validateSchema({username: req.body.username}, optional ? schema : schemaRequired, res);
        if (!result) return;

        req.userData.username = result.username;

        next();
    }
}

export default handleUserUsername;