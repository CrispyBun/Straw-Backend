import express from 'express';
import userRepository from '../database/UserRepository';
import bcrypt from 'bcrypt';
import builder from '../response/ResponseBuilder';
import jwt from 'jsonwebtoken';
import { logger } from '../logger/loggers';
import handleDatabaseError from '../middleware/helper/handleDatabaseError';

const tokenExpiration = "90d";
const jwtpass = process.env.JWT_PASS;
if (jwtpass === undefined) {
    const msg = "JWT_PASS missing in env";
    logger.error(msg);
    throw new Error(msg);
}

class UserController {
    async addUser(req: express.Request, res: express.Response) {
        if (!req.parsedBody.username) throw new Error();
        if (!req.parsedBody.email) throw new Error();
        if (!req.parsedBody.password) throw new Error();

        if (await userRepository.emailExists(req.parsedBody.email)) {
            builder
            .conflict()
            .setMessage("Email is already in use")
            .send(res);
            return;
        }

        if (await userRepository.usernameExists(req.parsedBody.username)) {
            builder
            .conflict()
            .setMessage("Username is already in use")
            .send(res);
            return;
        }

        const hash = await bcrypt.hash(req.parsedBody.password, 12);

        let id;
        try {
            id = await userRepository.add({password: hash, username: req.parsedBody.username, email: req.parsedBody.email});
        }
        catch (err) {
            return handleDatabaseError((err as any), res);
        }

        builder
        .success()
        .setData({id: id})
        .send(res);
    }

    async createToken(req: express.Request, res: express.Response) {
        if (!req.parsedBody.password) throw new Error();

        const builderInvalid = builder.badRequest().setMessage("Invalid user or password");

        let userData;
        if (req.parsedBody.username) userData = await userRepository.getLoginDataFromUsername(req.parsedBody.username);
        else if (req.parsedBody.email) userData = await userRepository.getLoginDataFromEmail(req.parsedBody.email);
        if (userData === undefined) return builderInvalid.send(res);
        
        const hash = userData.password;
        if (!hash) return builderInvalid.send(res);
        
        const match = await bcrypt.compare(req.parsedBody.password, hash);
        if (!match) return builderInvalid.send(res);

        if (jwtpass === undefined) throw new Error();
        const token = "Bearer " + jwt.sign({userId: userData.id}, jwtpass, {expiresIn: tokenExpiration});

        builder
        .success()
        .setData({token: token})
        .send(res);
    }
}

export default new UserController();