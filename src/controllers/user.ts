import { hashPassword, validateBody } from "../functions";
import { AuthReq } from "../middleware/authValidator";
import { createUser, createSession } from "../schema";
import express, { Response } from "express";

export  const signUp = async (req: AuthReq, res: Response) => {
    let isValid = validateBody(req, {
        email: { length: 25, type: "string" },
        username: { length: 30, type: "string" }, 
        password: { length: 40, type: "string" }
    });

    let user = await createUser(req.body.email, req.body.username, await hashPassword(req.body.password), 0)
    let session = await createSession(user.id);
    res.cookie("session", session.id);
    res.redirect("/");
}