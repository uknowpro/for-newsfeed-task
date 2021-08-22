import { Document } from 'mongoose';

export interface Page extends Document {
    id: string;
    name: string;
    description: string;
    creationAt: Date;
    extra?: object;
}
