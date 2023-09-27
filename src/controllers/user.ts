import { hashPassword, validateBody } from "../functions";
import { AuthReq } from "../middleware/authValidator";
import express, { Response } from "express";
import { createUser } from "../schema";


export  const signUp = async (req: AuthReq, res: Response) => {
    let isValid = validateBody(req, {
        email: { length: 25, type: "string" },
        username: { length: 30, type: "string" }, 
        password: { length: 40, type: "string" }
    });

    let user = createUser(req.body.email, req.body.username, await hashPassword(req.body.password), 0)
    
    ///console.log(user);
    
}