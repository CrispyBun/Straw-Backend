import express from 'express';
const router = express.Router();

import boardRouter from '../endpoints/board';
import userRouter from '../endpoints/user';

router.use("/board", boardRouter);
router.use("/user", userRouter);

export default router