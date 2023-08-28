import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";


export const dynamicParams = true;

export async function POST(req: Request, res: NextApiResponse) {
    const body = await req.json();
    console.log(body)
    return NextResponse.json({"data": "hello world"})
}