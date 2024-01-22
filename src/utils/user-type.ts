export interface IUser {
    email: string;
    name?: string;
}

export interface IUserFull extends IUser {
    password?: string;
}
