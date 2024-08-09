import { Router } from 'express';
import { getRegions } from '../controllers/region.controller';

const router = Router();

router.get('/regions', getRegions);

export default router;
