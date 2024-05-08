import express from 'express';

const addParsedBodyField = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.parsedBody = {};
    req.parsedQuery = {};
    req.parsedParams = {};
    next();
}

export default addParsedBodyField;