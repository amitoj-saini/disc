import { authenticateUser, createUser, setVerifacationCode } from "../schema";
import { AuthReq } from "../middleware/authValidator";
import { sendEmail, validateBody } from "../functions";
import { Response } from "express";

export const createVerifacationCode = async (userid: number) => {
    let users = await setVerifacationCode(userid);
    if (users.length >= 1) {
        let user = users[0]
        sendEmail(user.email, "Verify your Disc Account", `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Verify Your Disc Account</title>
            </head>
            <body style="font-family: sans-serif; text-align: center;">
                <h2 style="font-weight: 200; color: #fc6930;">Verify your Disc Account</h2>
                <p style="max-width: 400px; margin: 0 auto;">
                    Thank you for signing up with Disc. To complete the registration process and ensure the security of your account, please click the button below.
                </p>
                <a href="${process.env.TYPE || "http://"}://${process.env.URL || "localhost"}:${process.env.PORT || "4000"}/verify/${user.verifacationCode}" style="text-decoration: none;">
                    <button style="cursor: pointer; background-color: #fc6930; border: none; border-radius: 2.5px; font-size: 14px; font-weight: 100; color: white; padding: 7px 50px; display: block; margin: 30px auto;">Verify</button>
                </a>
            </body>
            </html>
        `);
    }
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