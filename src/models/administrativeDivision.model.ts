import mongoose, { Document, Schema } from 'mongoose';

export interface IAdministrativeDivision extends Document {
    Id: number;
    FullName: string;
    FullNameEn: string;
    ShortName: string;
    ShortNameEn: string;
    CodeName: string;
    CodeNameEn: string;
}

const AdministrativeDivisionSchema: Schema = new Schema({
    Id: { type: Number, required: true, unique: true },
    FullName: { type: String, required: true },
    FullNameEn: { type: String, required: true },
    ShortName: { type: String, required: true },
    ShortNameEn: { type: String, required: true },
    CodeName: { type: String, required: true },
    CodeNameEn: { type: String, required: true }
});

export const AdministrativeDivision = mongoose.model<IAdministrativeDivision>('AdministrativeDivision', AdministrativeDivisionSchema);
