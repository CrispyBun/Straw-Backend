import express from 'express';
import controller from '../controllers/UserController';
import handleBodyField from '../middleware/handleBodyField';
const user = express.Router();

user.post("/", handleBodyField("username"), handleBodyField("email"), handleBodyField("password"), (req, res) => {
    controller.addUser(req, res);
})

export default user