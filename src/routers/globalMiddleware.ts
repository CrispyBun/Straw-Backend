import express from 'express';
import logRequest from '../middleware/logRequest';
const router = express.Router();

router.use(logRequest);

export default router