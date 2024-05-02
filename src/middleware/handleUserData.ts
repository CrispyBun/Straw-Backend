import express from 'express';

const handleUserData = () => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {

        req.userData = {};

        next();
    }
}

export default handleUserData;