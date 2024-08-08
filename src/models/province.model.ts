import mongoose, { Document, Schema } from 'mongoose';


export interface IWard extends Document {
    Type: string;
    Code: string;
    Name: string;
    NameEn: string;
    FullName: string;
    FullNameEn: string;
    CodeName: string;
    DistrictCode: string;
    AdministrativeUnitId: number;
}

export interface IDistrict extends Document {
    Type: string;
    Code: string;
    Name: string;
    NameEn: string;
    FullName: string;
    FullNameEn: string;
    CodeName: string;
    ProvinceCode: string;
    AdministrativeUnitId: number;
    Ward: IWard[];
}

export interface IProvince extends Document {
    Type: string;
    Code: string;
    Name: string;
    NameEn: string;
    FullName: string;
    FullNameEn: string;
    CodeName: string;
    AdministrativeUnitId: number;
    AdministrativeRegionId: number;
    District: IDistrict[];
}

const WardSchema: Schema = new Schema({
    Type: { type: String, required: true },
    Code: { type: String, required: true },
    Name: { type: String, required: true },
    NameEn: { type: String, required: true },
    FullName: { type: String, required: true },
    FullNameEn: { type: String, required: true },
    CodeName: { type: String, required: true },
    DistrictCode: { type: String, required: true },
    AdministrativeUnitId: { type: Number, required: true }
});

const DistrictSchema: Schema = new Schema({
    Type: { type: String, required: true },
    Code: { type: String, required: true },
    Name: { type: String, required: true },
    NameEn: { type: String, required: true },
    FullName: { type: String, required: true },
    FullNameEn: { type: String, required: true },
    CodeName: { type: String, required: true },
    ProvinceCode: { type: String, required: true },
    AdministrativeUnitId: { type: Number, required: true },
    Ward: { type: [WardSchema], required: true }
});

const ProvinceSchema: Schema = new Schema({
    Type: { type: String, required: true },
    Code: { type: String, required: true },
    Name: { type: String, required: true },
    NameEn: { type: String, required: true },
    FullName: { type: String, required: true },
    FullNameEn: { type: String, required: true },
    CodeName: { type: String, required: true },
    AdministrativeUnitId: { type: Number, required: true },
    AdministrativeRegionId: { type: Number, required: true },
    District: { type: [DistrictSchema], required: true }
},{ collection: 'provinces' }); 


export const Province = mongoose.model<IProvince>('Province', ProvinceSchema);
