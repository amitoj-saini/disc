import { NextApiRequest, NextApiResponse } from "next/types";
import { findUser } from "@/app/utils/user";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    let sessionId = cookies().get("session")
    if (sessionId && sessionId.value) {
        let user = await findUser(sessionId.value)
        if (user) return NextResponse.json({id: user.id, username: user.username, name: user.name});
    }
    return NextResponse.json({"error": "User is not logged in"})
} 