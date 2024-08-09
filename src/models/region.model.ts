import mongoose, { Document, Schema } from 'mongoose';

export interface IRegion extends Document {
    Id: number;
    Name: string;
    NameEn: string;
    CodeName: string;
    CodeNameEn: string;
}

const RegionSchema: Schema = new Schema({
    Id: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    NameEn: { type: String, required: true },
    CodeName: { type: String, required: true },
    CodeNameEn: { type: String, required: true }
});

export const Region = mongoose.model<IRegion>('Region', RegionSchema);
