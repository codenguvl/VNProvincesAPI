import { Request, Response } from 'express';
import { Province } from '../models/province.model';

export const getProvinces = async (req: Request, res: Response) => {
    try {
        const provinces = await Province.find({}, {
            Code: 1, FullName: 1, Type: 1, _id: 0
        });

        const results = provinces.map(province => ({
            province_id: province.Code,
            province_name: province.FullName,
            province_type: province.Type,
        }));
        res.json({ results });
    } catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getDistrictsByProvinceId = async (req: Request, res: Response) => {
    try {
        const { province_id } = req.params;
        const province = await Province.findOne({ Code: province_id }, {
            'District.Code': 1, 'District.FullName': 1, _id: 0
        });
        if (!province) {
            return res.status(404).json({ error: 'Province not found' });
        }

        const results = province.District.map(district => ({
            district_id: district.Code,
            district_name: district.FullName,
        }));

        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getWardsByDistrictId = async (req: Request, res: Response) => {
    try {
        const { district_id } = req.params;
        const province = await Province.findOne(
            { 'District.Code': district_id },
            { 'District.$': 1, _id: 0 }
        );

        if (!province || !province.District.length) {
            return res.status(404).json({ error: 'District not found' });
        }

        const district = province.District[0];
        const results = district.Ward.map(ward => ({
            ward_id: ward.Code,
            ward_name: ward.FullName,
        }));

        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
