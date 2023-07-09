import { Model } from 'mongoose';

export interface IUser {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
    isAdmin: boolean;
}

export type UserTypeModel = Model<IUser>;
