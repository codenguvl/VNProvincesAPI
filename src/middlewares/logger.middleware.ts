import { Request, Response, NextFunction } from 'express';
import { logger } from '~/config/logger.config';

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl } = req;

    const start = Date.now();
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      const status = res.statusCode;
      const statusText = res.statusMessage || 'Unknown';
      const host = req.headers['host'] || 'Unknown host';
  
      const logInfo = {
        url: originalUrl,
        meta: {
          headers: {
            host: host
          }
        },
        status: `${status} ${statusText}`,
        method: method,
        duration: `${duration}ms`
      };

      if (status >= 400 && status < 500) {
        logger.warn('Client error occurred', logInfo);
      } else if (status >= 500) {
        logger.error('Server error occurred', logInfo);
      } else {
        logger.info('Request completed', logInfo);
      }
    });
  
    next();
};

export default logMiddleware;
