import { authenticateUser, createUser, setVerifacationCode } from "../schema";
import { AuthReq, User } from "../middleware/authValidator";
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
                <body style="font-family: sans-serif; text-align: center; max-width: 500px; margin: 0 auto;">
                    <h2 style="font-weight: 200; color: #fc6930;">Verify your Disc Account</h2>
                    <p> Welcome to Disc! To unlock all the features and ensure the security of your account, please verify your email address. </p>
                    <h3 style="color: #fc6930;">Why Verify Your Email?</h3>
                    <ul style="width: 100%; text-align: left;">
                        <li>
                            <strong style="color: #fc6930;">Security:</strong> Protect your account from unauthorized access.
                        </li>
                        <li>
                            <strong style="color: #fc6930;">Recovery:</strong> Safely retrieve your account if you forget your password.
                        </li>
                        <li>
                            <strong style="color: #fc6930;">Updates:</strong> Stay informed with timely news and personalized content.
                        </li>
                        <li>
                            <strong style="color: #fc6930;">Access:</strong> Enjoy the full Disc experience.
                        </li>
                    </ul>
                    <p>
                        <strong style="color: #fc6930;">Username:</strong> ${user.username}
                    </p>
                    <p>
                        <strong style="color: #fc6930;">Email:</strong> ${user.email}
                    </p>
                    <a href="${process.env.TYPE || " http://"}://${process.env.URL || "localhost" }:${process.env.PORT || "4000" }/verify/${user.verifacationCode}" style="text-decoration: none;">
                        <button style="cursor: pointer; background-color: #fc6930; border: none; border-radius: 2.5px; font-size: 14px; font-weight: 100; color: white; padding: 7px 50px; display: block; margin: 30px auto;">Verify</button>
                    </a>
                    <p>
                        <strong style="color: #fc6930;">Not you?</strong> If you didn't sign up for Disc, please disregard this email or contact us immediately at <a href="mailto:support.disc@outlook.com">support.disc@outlook.com</a>.
                    </p>
                    <p>Thank you for choosing <span style="color: #fc6930;">Disc</span>. Your data is safe with us, and your privacy is our priority. If you encounter any issues, our support team is here to help <a href="mailto:support.disc@outlook.com">(support.disc@outlook.com)</a>. Simply reply to this email. Secure your account now and dive into Disc. </p>
                </body>
            </html>
        `);
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