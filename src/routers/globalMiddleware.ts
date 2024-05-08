import express from 'express';
import addResponseId from '../middleware/addResponseLogId';
import addParsedReqFields from '../middleware/addParsedReqFields';
import logRequest from '../middleware/logRequest';
const router = express.Router();

router.use(addResponseId);
router.use(addParsedReqFields);
router.use(logRequest);

export default router