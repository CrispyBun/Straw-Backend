import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';

const stringSchema = joi.string().max(128, 'utf8').min(1).email();

const schema = joi.object({
    email: stringSchema
});

const schemaRequired = joi.object({
    email: stringSchema.required()
});

const handleUserEmail = (optional?: boolean) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = validateSchema({email: req.body.email}, optional ? schema : schemaRequired, res);
        if (!result) return;

        req.userData.email = result.email;

        next();
    }
}

export default handleUserEmail;