import { AuthReq, allowUsers, userValidationMiddleware } from "./middleware/authValidator";
import express, { Response } from "express";
import { signUp } from "./controllers/user";
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


// loggedout routes
app.get("/", allowUsers((req: AuthReq, res: Response) => res.render("loggedout/index.pug"), false))
app.get("/", allowUsers((req: AuthReq, res: Response) => res.render("loggedin/index.pug"), true))
app.post("/signup", allowUsers(signUp, false))

app.listen(port, () => {
    console.log(`Disc Server is running at http://localhost:${port}`)
})