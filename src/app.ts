import express from 'express';
import locationRoutes from './routes/provinces.routes';
import regionRoutes from './routes/region.routes';
import administrativeDivisionRoutes from './routes/administrativeDivision.routes';

const app = express();

app.use(express.json());
app.use('/api', locationRoutes);
app.use('/api', regionRoutes);
app.use('/api', administrativeDivisionRoutes);

export default app;
