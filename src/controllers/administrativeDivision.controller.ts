import { Request, Response } from 'express';
import { AdministrativeDivision } from '../models/administrativeDivision.model';

export const getAdministrativeDivisions = async (req: Request, res: Response) => {
    try {
        const divisions = await AdministrativeDivision.find({}, { _id: 0, __v: 0 });
        res.json({ results: divisions });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
