import express from 'express';
import joi from 'joi';
import builder from '../response/ResponseBuilder';
import validateSchema from './helper/validateSchema';
import { schemas, renames } from './helper/allSchemas';

const handleBodyField = (field: string, optional?: boolean) => {

    if (schemas[field] === undefined) {
        throw new Error(`Undefined body field: ${field}`);
    }

    let incomingFieldName = field;
    if (renames[field] !== undefined) {
        incomingFieldName = renames[field];
    }

    const schema = joi.object({
        [incomingFieldName]: schemas[field]
    });

    return (req: express.Request, res: express.Response, next: express.NextFunction) => {

        if (!optional && req.body[incomingFieldName] === undefined) {
            builder
            .badRequest()
            .setMessage(`"${incomingFieldName}" is required`)
            .send(res);
            return;
        }

        const result = validateSchema({[incomingFieldName]: req.body[incomingFieldName]}, schema, res);
        if (!result) return;

        (req.parsedBody as any)[field] = result[incomingFieldName];

        next();
    }
}

export default handleBodyField;