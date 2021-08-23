import { Document } from 'mongoose';

export interface User extends Document {
    id: string;
    password: string;
    name: string;
    roles?: [string];
    subscriptionPages?: [string];
    createdAt: Date;
    extra?: object;
}
