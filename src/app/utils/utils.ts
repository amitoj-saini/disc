import { NextApiRequest } from "next/types";
import bcrypt from "bcrypt";

declare module 'next' {export interface NextApiRequest {json: () => Promise<any>;}}

interface Fields {
    name: string;
    length: number;
}

export async function validateRequestBody(req: NextApiRequest, requiredFields: Fields[]) {
    let data = await req.json();

    for (let i=0; i<requiredFields.length; i++) {
        if (requiredFields[i].name in data) {
            if (data[requiredFields[i].name].length < requiredFields[i].length) continue;
            else return [data, `The ${requiredFields[i].name} was longer than ${requiredFields[i].length} characters`];
        } else {
            return [data, "Form was invalid"];
        }
    }

    return [data, null];
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePasswords = async (password: string, hashedPassword:string) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const genSession = (length=10) => 
    [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');

