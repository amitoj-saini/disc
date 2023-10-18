import { AuthReq, User } from "../middleware/authValidator";
import { createDisc } from "../schema";
import { Response } from "express";


export const createNewDisc = async (req: AuthReq, res: Response) => {
    let user = (req.user as User).id;
    createDisc(user);
}