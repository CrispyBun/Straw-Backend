import express from 'express';
const router = express.Router();

import boardRouter from '../endpoints/board';
import userRouter from '../endpoints/user';
import auth from '../endpoints/auth';

router.use("/board", boardRouter);
router.use("/user", userRouter);
router.use("/", auth);

export default router