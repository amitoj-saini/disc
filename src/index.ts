import { AuthReq, allowUsers, userValidationMiddleware } from "./middleware/authValidator";
import { resendVerifacation, verifyUser, codeLastSent, signIn, signUp } from "./controllers/user";
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

let rateLimitOptions = {
    windowMs: 2592000000,
    limit: 3,
    message: "Too many accounts created from this IP",
}

const signUpLimiter = rateLimit({...rateLimitOptions});
const loginLimiter = rateLimit({
    ...rateLimitOptions, limit: 250, message: "Too many logins"
});
const emailverifyLimiter = rateLimit({
    ...rateLimitOptions, windowMs: 75000,
    limit: 1, message: "Too many emails"});


// rate limit routes

app.use("/signup", signUpLimiter);
app.use("/login", loginLimiter);
app.use("/api/resendverifacation", emailverifyLimiter);

// loggedout routes
app.get("/", allowUsers((req: AuthReq, res: Response) => res.render("loggedout/index.pug"), false))
app.post("/signup", allowUsers(signUp, false))
app.post("/login", allowUsers(signIn, false))

// loggedin routes
app.get("/", allowUsers(dashboard, true, null))
app.get("/api/resendverifacation", allowUsers(resendVerifacation, true))
app.get("/api/codelastsent", allowUsers(codeLastSent, true))
app.get("/verify/:verifacationCode", allowUsers(verifyUser, true))


app.listen(port, () => {
    console.log(`Disc Server is running at http://localhost:${port}`)
})