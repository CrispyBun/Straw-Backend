import express from 'express';
import userRepository from '../database/UserRepository';
import jwt from 'jsonwebtoken';
import builder from '../response/ResponseBuilder';

const verifyUser = () => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const token = req.headers["x-auth"]?.toString();
        if (token === undefined) {
            builder
            .unauthorized()
            .setMessage("Missing X-Auth header")
            .send(res);
            return;
        }

        const builderInvalid = builder.unauthorized().setMessage("Invalid token");

        if (!process.env.JWT_PASS) throw new Error();
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_PASS);
        }
        catch(err) {
            return builderInvalid.send(res); // Invalid JWT
        }

        if (typeof decoded === "string") throw new Error();
        if (decoded.iat === undefined) return builderInvalid.send(res);
        const iat = decoded.iat;
        const userId = decoded.userId;

        const issuedAt = new Date(iat * 1000);

        const validity = await userRepository.getTokenValidity(userId);
        if (validity === undefined) return builderInvalid.send(res); // User not found

        if (validity.token_reset !== null) {
            const tokenResetDate = validity.token_reset;
            if (tokenResetDate > issuedAt) return builderInvalid.send(res); // Tokens have been reset
        }

        // User good :-)
        req.parsedHeaders.userId = userId;
        
        next();
    }
}

export default verifyUser;