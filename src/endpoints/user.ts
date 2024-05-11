import express from 'express';
import controller from '../controllers/UserController';
import handleBodyField from '../middleware/handleBodyField';
import handleEitherBodyField from '../middleware/handleEitherBodyField';
const user = express.Router();

user.post("/", handleBodyField("username"), handleBodyField("email"), handleBodyField("password"), (req, res) => {
    controller.addUser(req, res);
});

user.post("/authenticate", handleEitherBodyField("username", "email"), handleBodyField("password"), (req, res) => {
    controller.createToken(req, res);
});

export default user