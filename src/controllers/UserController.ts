import express from 'express';
import userRepository from '../database/UserRepository';
import bcrypt from 'bcrypt';
import builder from '../response/ResponseBuilder';

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
        const id = await userRepository.add({password: hash, username: req.parsedBody.username, email: req.parsedBody.email});

        builder
        .success()
        .setData({id: id})
        .send(res);
    }
}

export default new UserController();