import express from 'express';
import locationRoutes from './routes/location.routes';

const app = express();

app.use(express.json());
app.use('/api', locationRoutes);

export default app;
