
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Status {
    OK = "OK",
    ERROR = "ERROR"
}

export class CreateUserInput {
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export interface ReturnType {
    status: Status;
}

export class User {
    id: number;
    email: string;
    password: string;
}

export class UserReturnType implements ReturnType {
    status: Status;
    message: string;
}

export class LoginReturnType implements ReturnType {
    status: Status;
    accessToken?: Nullable<string>;
    message?: Nullable<string>;
}

export abstract class IQuery {
    abstract user(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): Nullable<UserReturnType> | Promise<Nullable<UserReturnType>>;

    abstract login(loginInput?: Nullable<LoginInput>): LoginReturnType | Promise<LoginReturnType>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
