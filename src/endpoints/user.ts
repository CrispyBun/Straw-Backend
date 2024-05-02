import express from 'express';
import controller from '../controllers/UserController';
import handleUserData from '../middleware/handleUserData';
import handleUserEmail from '../middleware/handleUserEmail';
import handleUserPassword from '../middleware/handleUserPassword';
const user = express.Router();

user.use("/", handleUserData());

user.post("/", handleUserEmail(), handleUserPassword(), (req, res) => {
    controller.addUser(req, res);
})

export default user