import express from 'express';
const router = express.Router();

import boardRouter from '../endpoints/board';

router.use("/board", boardRouter);

export default router