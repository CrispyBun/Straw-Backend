import { createLogger, transports, format } from 'winston';
import { consoleFormat, fileFormat, requestFormat } from './formats';

// Main logger
const logger = createLogger({
    level: process.env.LOG_LEVEL,
    transports: [
        new transports.Console({
            format: consoleFormat
        }),
        new transports.File({filename: "logs/main.log", format: fileFormat})
    ]
});

// Request logger
const requestLogger = createLogger({
    transports: [
        new transports.File({filename: "logs/requsts.log", format: requestFormat})
    ]
});

export { logger, requestLogger };