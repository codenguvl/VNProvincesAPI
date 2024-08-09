import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ level, message, timestamp, requestId, method, url, meta }) => {
    const log = {
      timestamp,
      level: level.toUpperCase(),
      requestId: requestId || undefined,
      method: method || undefined,
      url: url || undefined, 
      message,
      meta: meta || undefined
  };
      return JSON.stringify(log, null, 2);
  })
);


const transport = new DailyRotateFile({
  filename: path.join(__dirname, '../logs/%DATE%-results.log'),
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    maxSize: '20m',
    level: 'info',
    format: logFormat,
});

const logger = winston.createLogger({
    level: 'info',
    format: logFormat,
    transports: [
        transport,
        new winston.transports.Console({
            format: winston.format.simple()
        })
    ],
});

export { logger };