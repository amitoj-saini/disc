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

export const userValidationMiddleware = async (req: any, res: Response, next: NextFunction) => {
    // do some authentication
    if ("session" in req.cookies) {
        try {
            let sessionId = parseInt(req.cookies["session"]);
            if (Number.isNaN(sessionId)) return;
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
        } catch (err) { console.log( err) }
    }
    
    next();
    if (req.ws) next();
    // for some odd reason you have to run next twice for a ws req
}

export const allowUsers = (callback: (req: AuthReq, res: any, next: any) => void, users: boolean, needsVerifacation: number | null=0, redirecturl="") => {
    // boolean: true (allow only logged in users), false: (allow only loggedout users)
    // needs verifacation 0: false, 1: true
    return (req: AuthReq, res: Response, next: NextFunction) => {
        if ((users && req.user && (needsVerifacation == null || needsVerifacation == req.user.isVerified)) || (!users && !req.user)) callback(req, res, next);
        else if (redirecturl) res.status(301).redirect(redirecturl);
        else next();
    }
}

export const allowUsersWs = (callback: (req: AuthReq, res: any, next: any) => void, users: boolean, needsVerifacation: number | null=0, redirecturl="") => {
    let func = allowUsers(callback, users, needsVerifacation, redirecturl);
    return (res: any, req: AuthReq, next: any) => func(req, res, next);
}