import express from 'express';
import addResponseId from '../middleware/addResponseLogId';
import logRequest from '../middleware/logRequest';
const router = express.Router();

router.use(addResponseId);
router.use(logRequest);

export default router