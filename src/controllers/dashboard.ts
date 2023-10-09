import { User, AuthReq } from "../middleware/authValidator";
import express, { Response } from "express";
import { getUsersDiscs } from "../schema";

export const dashboard = async (req: AuthReq, res: Response) => {
    res.render("loggedin/index.pug", {
        discs: await getUsersDiscs((req.user as User).id),
        user: req.user
    })
}