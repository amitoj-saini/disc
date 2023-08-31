import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/app/utils/session";

export type User = {
    isLoggedIn: boolean,
    userid: number
}