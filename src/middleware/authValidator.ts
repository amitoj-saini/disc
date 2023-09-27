import { NextFunction, Request, Response } from "express";
import { getUserFromSession } from "../schema";

export interface AuthReq extends Request {
    // simpler to keep object the same just change isLoggedIn
    user?: {
        id: number,
        isVerified: number,
        username: string,
        session: number,
        email: string,
    },
}

export const userValidationMiddleware = async (req: AuthReq, res: Response, next: NextFunction) => {
    // do some authentication
    if ("session" in req.cookies) {
        try {
            let sessionId = parseInt(req.cookies["session"])
            let users = await getUserFromSession(sessionId);
            if (users.length >= 1) {
                req.user = {
                    isVerified: users[0].isVerified,
                    username: users[0].username,
                    session: users[0].session,
                    email: users[0].email,
                    id: users[0].id,
                }
            }
        } catch {}
    }
    next();
}

export const allowUsers = (callback: (req: AuthReq, res: Response, next: NextFunction) => void, users: boolean, redirecturl="") => {
    // boolean: true (allow only logged in users), false: (allow only loggedout users)
    return (req: AuthReq, res: Response, next: NextFunction) => {
        if ((users && req.user) || (!users && !req.user)) callback(req, res, next);
        else if (redirecturl) res.status(301).redirect(redirecturl);
        else next();
    }
}