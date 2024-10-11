import { AddressModel } from "./addess.model";

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export enum Role {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = 'ROLE_USER'
}

export type UserModel = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    username: string;
    email: string;
    phoneNumber?: string;
    dateOfBirth?: Date;
    gender?: Gender;
    role?: Role;
    address?: AddressModel;
    facebookAccountId?: string;
    googleAccountId?: string;
    avatarUrl?: string;
}