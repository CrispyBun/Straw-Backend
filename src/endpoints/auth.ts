import express from 'express';
import controller from '../controllers/UserController';
import handleBodyField from '../middleware/handleBodyField';
import handleEitherBodyField from '../middleware/handleEitherBodyField';
const auth = express.Router();

auth.post("/authenticate", handleEitherBodyField("username", "email"), handleBodyField("password"), (req, res) => {
    controller.createToken(req, res);
});

export default auth;