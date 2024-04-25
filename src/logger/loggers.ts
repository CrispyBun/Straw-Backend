import { createLogger, transports, format } from 'winston';
import { consoleFormat, fileFormat } from './formats';

// Main logger
const logger = createLogger({
    transports: [
        new transports.Console({
            format: consoleFormat
        }),
        new transports.File({filename: "logs/main.log", format: fileFormat})
    ]
});

export { logger };