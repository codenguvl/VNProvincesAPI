import { Request, Response } from 'express';
import { Region } from '../models/region.model';

export const getRegions = async (req: Request, res: Response) => {
    try {
        const regions = await Region.find({}, { _id: 0, __v: 0 });
        res.json({ results: regions });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
