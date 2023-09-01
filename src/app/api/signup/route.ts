import { createSession, createUser } from "@/app/utils/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { validateRequestBody } from "@/app/utils/utils";
import {  NextResponse } from "next/server";
import { cookies } from "next/headers"

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
        let user = await createUser(data["name"], data["username"], data["email"], data["password"]);
        let session = await createSession(user);
        cookies().set("session", session.id);
    } catch (err) {
        return NextResponse.json({"error": "Unable to create user, username or email already exists"});}
    return NextResponse.json({"success": "User has been created"})
}