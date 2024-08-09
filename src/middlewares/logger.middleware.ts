// src/middlewares/logger.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { logger } from '~/config/logger.config';
import { v4 as uuidv4 } from 'uuid';

const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl } = req;
    const requestId = uuidv4(); 
    req.headers['x-request-id'] = requestId;

    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info('Request completed', {
            requestId,
            method,
            url: originalUrl,
            status: res.statusCode,
            duration: `${duration}ms`,
            meta: {
                headers: req.headers,
                query: req.query,
                body: req.body
            }
        });
    });

    next();
};

export default logMiddleware;
