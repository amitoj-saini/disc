import type { IronSessionOptions } from "iron-session";
import { User } from './../api/user/route';

export const sessionOptions: IronSessionOptions = {
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    cookieName: "userdata",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"
    }
}

declare module "iron-session" {
    interface IronSessionData {
        user?: User
    }
}