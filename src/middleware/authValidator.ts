import { NextFunction, Request, Response } from "express";

export interface AuthReq extends Request {
    // simpler to keep object the same just change isLoggedIn
    user?: {
        username: string,
        email: string,
        name: string,
    },
}

export const userValidationMiddleware = (req: AuthReq, res: Response, next: NextFunction) => {
    // do some authentication
    next();
}

export const allowUsers = (callback: (req: AuthReq, res: Response, next: NextFunction) => void, users: boolean, redirecturl="") => {
    // boolean: true (allow only logged in users), false: (allow only loggedout users)
    return (req: AuthReq, res: Response, next: NextFunction) => {
        if ((users && req.user) || (!users && !req.user)) callback(req, res, next);
        if (!redirecturl) next();
        else res.status(301).redirect(redirecturl);
    }
}