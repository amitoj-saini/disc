import { redirect } from "next/navigation";
import { findUser } from "../utils/user";
import { cookies } from "next/headers";

export async function authValidator(requiredLoggedIn=true, redirectPath="") {
    redirectPath = ((redirectPath != "") ? redirectPath : ((requiredLoggedIn) ? "/" : "/dashboard"))
    let sessionId = cookies().get("session")
    if (sessionId && sessionId.value) {
        let user = await findUser(sessionId.value)
        if (requiredLoggedIn && user) return user
        if (!requiredLoggedIn && !user) return null;
    }
    
    return redirectPath // :( cannot redirect in component so have to return to main
}