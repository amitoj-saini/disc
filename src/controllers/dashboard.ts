import { AuthReq } from "../middleware/authValidator";
import express, { Response } from "express";

export const dashboard = (req: AuthReq, res: Response) => {
    console.log(req.user);
    res.send("hello world, you are logged in !!!!");
}