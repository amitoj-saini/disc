import { AuthReq } from "./middleware/authValidator";
import bcrypt from "bcrypt";

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