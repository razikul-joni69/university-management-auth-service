import path from 'path';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, prettyPrint, printf } = format;

// Custon Log Format
const myFormat = printf(({ level, message, label, timestamp }) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    return `${date.toDateString()} - ${hour}:${minute}:${seconds} - [${label}] - ${level.toUpperCase()}: ${message}`;
});

const logger = createLogger({
    level: 'info',
    format: combine(label({ label: 'UMAS' }), timestamp(), myFormat),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                'logs',
                'winston',
                'successes',
                'UMAS-%DATE%-success.log'
            ),
            datePattern: 'DD-MM-YYYY-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

const errorLogger = createLogger({
    level: 'error',
    format: combine(label({ label: 'UMAS' }), timestamp(), prettyPrint()),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: path.join(
                process.cwd(),
                'logs',
                'winston',
                'errors',
                'UMAS-%DATE%-error.log'
            ),
            datePattern: 'DD-MM-YYYY-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

export { errorLogger, logger };
