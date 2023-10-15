import { AuthReq } from "./middleware/authValidator";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import fs from "fs";

export const fileLogger = (message: string, filepath="logger.txt") => {
    try {
        fs.appendFileSync(filepath, `\n${message}`)
    } catch {fs.writeFileSync(filepath, message)}
}

export const validateBody = (req: AuthReq, wantedValues: { [key: string]: {length: number, type: string}}) => {
    for (let value in wantedValues) {
        if (value in req.body) {
            if ((typeof req.body[value]) != wantedValues[value].type) return `${value} was not a ${wantedValues[value].type}`;
            if (req.body[value].length > wantedValues[value].length) return `${value} was longer than ${wantedValues[value].length}`;
        } else return `${value} was not in the body`;
        
    }

    return true;
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePasswords = async (password: string, hashedPassword:string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const sendEmail = (to: string, subject: string, html: string) => {
    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
         user: process.env.MAILUSR || "",
         pass: process.env.MAILPWD || ""
       },
    });

    const mailOptions = {
        from: 'Disc',
        to: to,
        subject: subject,
        html: html
    };

    /*transporter.sendMail(mailOptions, (error, info) => {
        // remove once finished email part of this project
        if (error) fileLogger(error.toString());
        else fileLogger(info.response);
    });*/
}