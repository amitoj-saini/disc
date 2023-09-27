import { AuthReq } from "../middleware/authValidator";
import { validateBody } from "../functions";
import express, { Response } from "express";
import { authenticateUser, createUser } from "../schema";

export const signUp = async (req: AuthReq, res: Response) => {
    let isValid = validateBody(req, {
        email: { length: 25, type: "string" },
        username: { length: 30, type: "string" }, 
        password: { length: 40, type: "string" }
    });

    if (isValid == true) {
        try {
            let user = await createUser(req.body.email, req.body.username, req.body.password, 0)
            res.cookie("session", user.session);
            res.redirect("/");
        } catch {
            res.json({"error": "Something went wrong..."});    
        }
    } else {
        res.json({"error": isValid});
    }
}

export const signIn = async (req: AuthReq, res: Response) => {
    let isValid = validateBody(req, {
        username: { length: 30, type: "string" }, 
        password: { length: 40, type: "string" }
    });

    if (isValid == true) {
        let user = await authenticateUser(req.body.username, req.body.password);
        if (user) {
            res.cookie("session", user.session);
            res.redirect("/");
        } else {
            res.json({"error": "Incorrect"});
        }
    } else res.json({"error": isValid});
}