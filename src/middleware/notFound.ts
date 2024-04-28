import express from 'express';
import builder from '../response/ResponseBuilder';

export default (req: express.Request, res: express.Response) => {
    builder
    .notFound()
    .send(res);
}