import { jsonReader, jsonWriter } from "../functions";
import { NextFunction, Response } from "express";
import { AuthReq } from "./authValidator";

// time in ms
export const rateLimiter = (limitName: string, rate=5000, limit=5, gen_key=(req: AuthReq, res: Response) => {return req.socket.remoteAddress}, limitCallback=(req: AuthReq, res: Response) => {res.send("Ratelimit")}, rateLimitFile="ratelimit.ignore.json") => {
    return (req: AuthReq, res: Response, next: NextFunction) => {
        let key = gen_key(req, res) || "";
        let data = jsonReader(rateLimitFile);
        let time = new Date().getTime();
        if (!(limitName in data)) data[limitName] = {};
        if (!(key in data[limitName])) {
            data[limitName][key] = {
                recordedOn: time,
                endTime: time+rate,
                visitCount: 0,
            }
        }
        if (data[limitName][key]["endTime"] < time) {
            data[limitName][key]["endTime"] = time + rate;
            data[limitName][key]["visitCount"] = 0;
        }
        data[limitName][key]["visitCount"]++;
        jsonWriter(rateLimitFile, data);
        if (data[limitName][key]["visitCount"] > limit) return limitCallback(req, res);
        else next();
    }
}