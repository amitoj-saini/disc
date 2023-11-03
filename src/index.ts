import { AuthReq, allowUsers, allowUsersWs, userValidationMiddleware } from "./middleware/authValidator";
import { resendVerifacation, verifyUser, codeLastSent, signIn, signUp } from "./controllers/user";
import { createNewDisc, discEditor } from "./controllers/disc";
import { rateLimiter } from "./middleware/rateLimiter";
import { dashboard } from "./controllers/dashboard";
import express, { Response } from "express";
import cookieParser from "cookie-parser";
import expressWs from "express-ws";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = expressWs(express()).app;
const port = process.env.PORT;

app.use("/public", express.static("src/static"));
app.set("view engine", "pug");
app.set("views", path.join("src", "views"));
app.use(cookieParser());
app.use(userValidationMiddleware)
app.use(express.urlencoded({extended: true}));

// rate limiting
app.use("/signup", rateLimiter("signUp", 2592000000, 3));
app.use("/login", rateLimiter("signUp", 604800000, 250));
app.use("/api/resendverifacation", rateLimiter("signUp", 75000, 1));
app.use("/createnewdisc", rateLimiter("signUp", 86400000, 10));

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

app.ws("/disc", allowUsersWs((req, ws) => {
    console.log(req.user)
}, true, 1))

app.listen(port, () => {
    console.log(`Disc Server is running at http://localhost:${port}`)
})