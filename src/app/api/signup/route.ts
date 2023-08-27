import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: true,
    },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    
    return NextResponse.json({"data": "hello world"})
}