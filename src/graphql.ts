
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class User {
    id: number;
    email: string;
    password: string;
}

export class AuthEntity {
    accessToken?: Nullable<string>;
}

export abstract class IQuery {
    abstract user(): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract login(loginInput?: Nullable<LoginInput>): AuthEntity | Promise<AuthEntity>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
