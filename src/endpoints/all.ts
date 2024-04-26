import express from 'express';
const all = express.Router();

import boardRouter from './board';

all.use("/board", boardRouter);

export default all