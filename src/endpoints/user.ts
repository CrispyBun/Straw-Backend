import express from 'express';
import controller from '../controllers/UserController';
import handleBodyField from '../middleware/handleBodyField';
import verifyUser from '../middleware/verifyUser';
import { handleUserIdParam } from '../middleware/handleIdParam';
const user = express.Router();

user.get("/:id", handleUserIdParam("id"), verifyUser(true), (req, res) => {
    controller.getUser(req, res);
});

user.post("/", handleBodyField("username"), handleBodyField("email"), handleBodyField("password"), (req, res) => {
    controller.addUser(req, res);
});

export default user