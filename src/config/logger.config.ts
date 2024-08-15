import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss,SSS' }),
  winston.format.printf(({ level, timestamp, url, meta, duration, status }) => {
    const decodedUrl = url ? decodeURIComponent(url) : 'no-route';

    const host = meta?.headers?.host || 'unknown-host';
    const logContent = [
      `Request received from host: ${host}`,
      `Duration: ${duration || 'unknown'}`,
      `Status: ${status || 'unknown'}`
    ].join(' | ');

    return `${timestamp} ${level.toUpperCase()}: [${decodedUrl}] ${logContent}`;
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
    /* new winston.transports.Console({
      format: winston.format.simple()
    }) */
  ],
});

export { logger };
