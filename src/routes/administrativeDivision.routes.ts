import { Router } from 'express';
import { getAdministrativeDivisions } from '../controllers/administrativeDivision.controller';

const router = Router();

router.get('/administrative-divisions', getAdministrativeDivisions);

export default router;
