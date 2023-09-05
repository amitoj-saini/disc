import { authValidator } from "../components/authValidator";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    let redirectUrl = await authValidator(true);
    if (typeof redirectUrl == "string") redirect(redirectUrl);
    return (
        <></>
    )
}