import { AuthReq, allowUsers, userValidationMiddleware } from "./middleware/authValidator";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("view engine", "pug");
app.use(userValidationMiddleware)

app.get("/", allowUsers((req: AuthReq, res: Response) => {
    res.send("Hello you are logged out")
}, false))

app.listen(port, () => {
    console.log(`Disc Server is running at http://localhost:${port}`)
})