import { createSession, fetchUser } from "@/app/utils/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { comparePasswords, validateRequestBody } from "@/app/utils/utils";
import {  NextResponse } from "next/server";
import { cookies } from "next/headers"

export const dynamicParams = true;

// signup fields defenition
const loginFields = [
    {name: "username", length: 50},
    {name: "password", length: 50}
]

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    let [data, err] = await validateRequestBody(req, loginFields);
    if (err) return NextResponse.json({"error": err});
    try {
        let user = await fetchUser(data["username"])
        if (user) {
            if(await comparePasswords(data["password"], user.password)) {
                let session = await createSession(user);
                cookies().set("session", session.id);
                return NextResponse.json({"success": "You have logged in"})
            }
        }
    } catch (err) {};
    return NextResponse.json({"error": "Incorrect Username or Password"})
}