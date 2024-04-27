import express from 'express';
import joi from 'joi';
import builder from '../../response/ResponseBuilder';

const validateSchema = (value: any, schema: joi.ObjectSchema, res: express.Response) => {
    const result = schema.validate(value);
    if (result.error) {
        builder
        .badRequest()
        .setMessage(result.error.message)
        .send(res);
        return undefined;
    }
    return result.value;
}

export default validateSchema;