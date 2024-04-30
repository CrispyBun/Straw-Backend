import { format } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const consoleFormat = combine(
    colorize(),
    timestamp(),
    printf(({ level, message, timestamp }) => {
        return `\x1b[90m${timestamp}\x1b[0m ${level}: ${message}`;
    })
);

const fileFormat = combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
        return `${timestamp} ${level}: ${message}`;
    })
);

const requestFormat = combine(
    timestamp(),
    printf(({ level, message, timestamp }) => {
        return `${timestamp}
Url:     ${message.req.url}
Res ID:  ${message.res.logId}
Method:  ${message.req.method}
Origin:  ${message.req.headers.origin}
IP:      ${message.req.ip}
`;
    })
);

export { consoleFormat, fileFormat, requestFormat };