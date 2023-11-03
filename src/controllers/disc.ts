import { generateUserContent } from "../functions";
import { AuthReq, User } from "../middleware/authValidator";
import { createDisc, getUserFromId, getUsersDiscFromId } from "../schema";
import { Response } from "express";
import fs from "fs";

export const createNewDisc = async (req: AuthReq, res: Response) => {
    let user = (req.user as User);
    let disc = await createDisc(user.id);
    generateUserContent(user.id, disc.id);
    res.redirect(`/${user.id}/${disc.id}`)
}

export const discEditor = async (req: AuthReq, res: Response) => {
    if (!req.params.user || !req.params.disc) res.send('error');
    let userid = (parseInt(req.params.user) as number);
    let discOwner = await getUserFromId(userid)
    let disc = await getUsersDiscFromId(userid, (parseInt(req.params.disc) as number))
    if (discOwner.length == 1 && disc.length == 1) {
        res.render("loggedin/disc.pug", {
            user: (req.user as User),
            discOwner: Object.entries(discOwner[0]).reduce((obj: any, item: any) => 
                (item[0] !== "password") ? (obj[item[0]] = item[1], obj) : obj, {}),
            // all this work for just removing the password key, typescript lol
            disc: disc
        });
    } else {
        res.render("other/error.pug")
    }
}