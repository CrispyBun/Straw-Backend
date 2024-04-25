import { createLogger, transports, format } from 'winston';
import { consoleFormat, fileFormat } from './formats';

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

export { logger };