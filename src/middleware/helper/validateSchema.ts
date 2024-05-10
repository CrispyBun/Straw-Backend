import express from 'express';
import joi from 'joi';
import builder from '../../response/ResponseBuilder';

const validateSchema = (value: any, schema: joi.ObjectSchema, res: express.Response) => {
    const result = schema.validate(value);
    if (result.error) {
        let message = result.error.message;
        message = message.replace('"value"', "body");

        builder
        .badRequest()
        .setMessage(message)
        .send(res);
        return undefined;
    }
    return result.value;
}

export default validateSchema;