import { resendVerifacation, verifyUser, codeLastSent, signIn, signUp } from "./controllers/user";
import { AuthReq, allowUsers, userValidationMiddleware } from "./middleware/authValidator";
import { createNewDisc, discEditor } from "./controllers/disc";
import { dashboard } from "./controllers/dashboard";
import express, { Response } from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/public", express.static("src/static"));
app.set("view engine", "pug");
app.set("views", path.join("src", "views"));
app.use(cookieParser());
app.use(userValidationMiddleware)
app.use(express.urlencoded({extended: true}));

// rate limit options

let rateLimitIpOptions = {
    windowMs: 2592000000,
    limit: 3,
    message: "Too many accounts created from this IP",
}

let rateLimitUserOptions = {
    keyGenerator: (req: AuthReq) => {
        if (req.user) return req.user.id.toString();
        return req.ip
    }
}

const signUpLimiter = rateLimit({...rateLimitIpOptions});

const loginLimiter = rateLimit({
    ...rateLimitIpOptions, limit: 250, message: "Too many logins"
});

const emailverifyLimiter = rateLimit({
    ...rateLimitUserOptions, windowMs: 75000,
    limit: 1, message: "Too many emails"});

const discCreatorLimiter = rateLimit({
        ...rateLimitUserOptions, windowMs: 86400000,
        limit: 10, message: "Too many Discs"});


// rate limit routes

app.use("/signup", signUpLimiter);
app.use("/login", loginLimiter);
app.use("/api/resendverifacation", emailverifyLimiter);
app.use("/createnewdisc", discCreatorLimiter);

// loggedout routes
app.get("/", allowUsers((req: AuthReq, res: Response) => res.render("loggedout/index.pug"), false));
app.post("/signup", allowUsers(signUp, false));
app.post("/login", allowUsers(signIn, false));

// loggedin routes (can be verified or unverified)
app.get("/", allowUsers(dashboard, true, null));

// logged in routes (no verifacation required)
app.get("/api/resendverifacation", allowUsers(resendVerifacation, true));
app.get("/api/codelastsent", allowUsers(codeLastSent, true));
app.get("/verify/:verifacationCode", allowUsers(verifyUser, true));

// logged in routes (verifacation required)
app.post("/createnewdisc", allowUsers(createNewDisc, true, 1));
app.get("/:user/:disc", allowUsers(discEditor, true, 1));

app.listen(port, () => {
    console.log(`Disc Server is running at http://localhost:${port}`)
})