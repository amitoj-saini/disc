import { findUser } from "../utils/user";
import { cookies } from "next/headers";

export async function authValidator(requiredLoggedIn=true, redirectPath="") {
    redirectPath = ((redirectPath != "") ? redirectPath : ((requiredLoggedIn) ? "/" : "/dashboard"))
    let sessionId = cookies().get("session");
    let user = null;
    if (sessionId && sessionId.value) user = await findUser(sessionId.value);
    if (requiredLoggedIn && user) return user;
    if (!requiredLoggedIn && user) return redirectPath;
    if (requiredLoggedIn && !user) return redirectPath;
}