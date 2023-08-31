import { validateRequestBody, hashPassword } from "@/app/utils/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/app/utils/session";
import { PrismaClient } from "@prisma/client";
import {  NextResponse } from "next/server";
import { User } from "../user/route";

const prisma = new PrismaClient();

export const dynamicParams = true;

// signup fields defenition
const signupFields = [
    {name: "name", length: 15},
    {name: "email", length: 25},
    {name: "username", length: 12},
    {name: "password", length: 25}
]

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    
    let [data, err] = await validateRequestBody(req, signupFields);
    if (err) return NextResponse.json({"error": err});
    try {
        const user = await prisma.user.create({
            data: {
                name: data["name"],
                username: data["username"],
                password: await hashPassword(data["password"]),
                email: data["email"],
                
            }
        });

        req.session.user = { isLoggedIn: true, userid: user.id } as User
        console.log(req.session.user)
        await req.session.save()
    } catch (err) {
        console.log(err);
        return NextResponse.json({"error": "Unable to create user, username or email already exists"});}
    
    
    return NextResponse.json({"data": "hello world"})
}