import { AuthReq } from "../middleware/authValidator";
import express, { Response } from "express";

export const dashboard = (req: AuthReq, res: Response) => {
    res.render("loggedin/index.pug")
}