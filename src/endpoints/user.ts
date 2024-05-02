import express from 'express';
import handleUserData from '../middleware/handleUserData';
const user = express.Router();

user.use("/", handleUserData());

export default user