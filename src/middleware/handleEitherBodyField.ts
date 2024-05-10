import express from 'express';
import joi from 'joi';
import builder from '../response/ResponseBuilder';
import validateSchema from './helper/validateSchema';
import { schemas, renames } from './helper/allSchemas';

const handleEitherBodyField = (...fields: string[]) => {

    const incomingFieldNames = [...fields];
    const schemaObject: {[name: string]: joi.Schema} = {};

    for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex ++) {
        const field = fields[fieldIndex];

        if (schemas[field] === undefined) {
            throw new Error(`Undefined body field: ${field}`);
        }

        if (renames[field] !== undefined) {
            incomingFieldNames[fieldIndex] = renames[field];
        }

        schemaObject[incomingFieldNames[fieldIndex]] = schemas[field];
    }

    const schema = joi.object({
        body: joi.object(schemaObject).xor(...incomingFieldNames).unknown(true).required()
    });

    return (req: express.Request, res: express.Response, next: express.NextFunction) => {

        const result = validateSchema({body: req.body}, schema, res);
        if (!result) return;

        for (const fieldIndex in fields) {
            const incomingFieldName = incomingFieldNames[fieldIndex];

            const parsed = result.body[incomingFieldName];
            if (parsed !== undefined) {
                const field = fields[fieldIndex];
                (req.parsedBody as any)[field] = parsed;    
            }
        }

        next();
    }
}

export default handleEitherBodyField;