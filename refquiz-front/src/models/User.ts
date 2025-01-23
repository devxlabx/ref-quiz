import {Role} from "./Role";

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    validationPassword?: string;
    createdAt?: Date;
    roles?: Role[];
}