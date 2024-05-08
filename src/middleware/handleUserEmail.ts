import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';
import stringSchema from './joischemas/userEmail'

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