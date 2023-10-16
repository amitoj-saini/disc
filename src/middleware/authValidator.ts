import { NextFunction, Request, Response } from "express";
import { getUserFromSession } from "../schema";

export interface User {
    // simpler to keep object the same just change isLoggedIn
    id: number,
    codeLastSent: number | null,
    verifacationCode: number | null,
    isVerified: number,
    username: string,
    session: number,
    email: string,
}

export interface AuthReq extends Request {
    user?: User
}

export const userValidationMiddleware = async (req: AuthReq, res: Response, next: NextFunction) => {
    // do some authentication
    if ("session" in req.cookies) {
        try {
            let sessionId = parseInt(req.cookies["session"])
            let users = await getUserFromSession(sessionId);
            if (users.length >= 1) {
                req.user = {
                    verifacationCode: users[0].verifacationCode,
                    codeLastSent: users[0].codeLastSent,
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

export const allowUsers = (callback: (req: AuthReq, res: Response, next: NextFunction) => void, users: boolean, needsVerifacation: number | null=0, redirecturl="") => {
    // boolean: true (allow only logged in users), false: (allow only loggedout users)
    // needs verifacation 0: false, 1: true
    return (req: AuthReq, res: Response, next: NextFunction) => {
        if ((users && req.user && (needsVerifacation == null || needsVerifacation == req.user.isVerified)) || (!users && !req.user)) callback(req, res, next);
        else if (redirecturl) res.status(301).redirect(redirecturl);
        else next();
    }
}