import { AuthReq, allowUsers, userValidationMiddleware } from "./middleware/authValidator";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use("/public", express.static("src/static"));
app.set("view engine", "pug");
app.set("views", path.join("src", "views"));
app.use(userValidationMiddleware)

// loggedout routes
app.get("/", allowUsers((req: AuthReq, res: Response) => res.render("loggedout/index.pug"), false))

app.listen(port, () => {
    console.log(`Disc Server is running at http://localhost:${port}`)
})