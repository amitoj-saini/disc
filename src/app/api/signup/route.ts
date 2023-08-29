import validateRequestBody from "@/app/utils/validation";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export const dynamicParams = true;

// signup fields defenition
const signupFields = [
    {name: "name", length: 15},
    {name: "email", length: 25},
    {name: "username", length: 12},
    {name: "password", length: 25}
]

export async function POST(req: Request, res: NextApiResponse) {
    let [data, err] = await validateRequestBody(req, signupFields);
    if (err) return NextResponse.json({"error": err});
    return NextResponse.json({"data": "hello world"})
}