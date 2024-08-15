import express from 'express'
import locationRoutes from './routes/provinces.routes'
import regionRoutes from './routes/region.routes'
import administrativeDivisionRoutes from './routes/administrativeDivision.routes'
import cors from 'cors';

import logMiddleware from './middlewares/logger.middleware'
/* import './services/redis.service' */

import os from 'os'

const numCPUs = os.cpus().length;
process.env.UV_THREADPOOL_SIZE = numCPUs.toString();


const app = express()

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json())
app.use(logMiddleware)

app.use('/api', locationRoutes)
app.use('/api', regionRoutes)
app.use('/api', administrativeDivisionRoutes)

export default app
