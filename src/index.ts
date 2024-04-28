import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet  from 'helmet';
import { logger } from './logger/loggers';
import pgclient from './database/client';

import globalMiddleware from './routers/globalMiddleware';
import endpoints from './routers/endpoints';
import notFound from './middleware/notFound';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(cors({
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS']
}));
app.use(helmet({
    // Disable frame
    frameguard: false,
    // Disable content security policy
    contentSecurityPolicy: false,
    // Cross origin resource policy
    crossOriginResourcePolicy: {policy: "cross-origin"},
    // Disable script-src 'self'
    hidePoweredBy: true,
}));
app.use(express.json());

app.use(globalMiddleware);
app.use(endpoints);
app.use(notFound);
app.use(errorHandler);

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