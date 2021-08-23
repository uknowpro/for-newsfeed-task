import { Document } from 'mongoose';

export interface Page extends Document {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    extra?: object;
}
