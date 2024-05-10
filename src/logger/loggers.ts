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

if (process.env.LOG_LEVEL === undefined) {
    logger.warn("LOG_LEVEL missing in env - please choose one of: silly, debug, verbose, http, info, warn, error");
}

export { logger, requestLogger };