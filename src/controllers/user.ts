import { authenticateUser, createUser, setVerifacationCode } from "../schema";
import { AuthReq, User } from "../middleware/authValidator";
import { sendEmail, validateBody } from "../functions";
import { Response } from "express";
import pug from "pug";
import fs from "fs";

export const createVerifacationCode = async (userid: number) => {
    let users = await setVerifacationCode(userid);
    if (users.length >= 1) {
        let user = users[0];
        sendEmail(user.email, "Verify your Disc Account", pug.render(fs.readFileSync("src/views/other/verifacationemail.pug", "utf-8"), {
            username: user.username,
            email: user.email,
            url: `${process.env.TYPE || " http://"}://${process.env.URL || "localhost" }:${process.env.PORT || "4000" }/verify/${user.verifacationCode}`
        }));
    }
}

export const codeLastSent = (req: AuthReq, res: Response) => {
    let codeLastSent = (req.user as User).codeLastSent;
    if (codeLastSent && new Date().getTime() < (codeLastSent+80000)) 
        return res.json({
            wait: (codeLastSent+80000) - new Date().getTime()
        })
    ; else return res.json({wait: 0})
}

export const resendVerifacation = (req: AuthReq, res: Response) => {
    createVerifacationCode((req.user as User).id)
    res.json({"message": "Code has been sent", "wait": 5000})
}

export const signUp = async (req: AuthReq, res: Response) => {
    let isValid = validateBody(req, {
        email: { length: 75, type: "string" },
        username: { length: 40, type: "string" }, 
        password: { length: 60, type: "string" }
    });

    if (isValid == true) {
        try {
            let user = await createUser(req.body.email, req.body.username, req.body.password, 0);
            res.cookie("session", user.session);
            createVerifacationCode(user.id);
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
        username: { length: 40, type: "string" }, 
        password: { length: 60, type: "string" }
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