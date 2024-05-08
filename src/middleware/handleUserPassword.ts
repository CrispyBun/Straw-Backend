import express from 'express';
import joi from 'joi';
import validateSchema from './helper/validateSchema';
import stringSchema from './joischemas/userPassword';

const schema = joi.object({
    password: stringSchema
});

const schemaRequired = joi.object({
    password: stringSchema.required()
});

const handleUserPassword = (optional?: boolean) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const result = validateSchema({password: req.body.password}, optional ? schema : schemaRequired, res);
        if (!result) return;

        req.userData.password = result.password;

        next();
    }
}

export default handleUserPassword;