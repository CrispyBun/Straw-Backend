import express from 'express';
import userRepository from '../database/UserRepository';
import bcrypt from 'bcrypt';
import builder from '../response/ResponseBuilder';

class UserController {
    async addUser(req: express.Request, res: express.Response) {
        if (!req.userData.email) throw new Error();
        if (!req.userData.password) throw new Error();

        if (await userRepository.emailExists(req.userData.email)) {
            builder
            .conflict()
            .setMessage("Email is already in use")
            .send(res);
            return;
        }

        const hash = await bcrypt.hash(req.userData.password, 12);
        const id = await userRepository.add({password: hash, email: req.userData.email});

        builder
        .success()
        .setData({id: id})
        .send(res);
    }
}

export default new UserController();