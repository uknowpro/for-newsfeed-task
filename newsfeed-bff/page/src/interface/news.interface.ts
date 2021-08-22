import { Document } from 'mongoose';

export interface News extends Document {
    id: string;
    title: string;
    content: string;
    creationAt: Date;
    extra?: object;
}
