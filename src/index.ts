import 'dotenv/config';
import express from 'express';
import helmet  from 'helmet';
import { logger } from './logger/loggers';
import pgclient from './database/client';

import endpoints from './endpoints/all';

const app = express();

app.use(helmet());
app.use(express.json());

app.use(endpoints);

logger.info("Launching");
logger.info("Connecting to database");
pgclient.connect((err) => {
    if (err) {
        logger.error("Could not connect to database");
        logger.error(err.stack);
    }

    logger.info("Launching server");
    app.listen(3000, () => {
        logger.info("Server is running on port 3000");
    });
});