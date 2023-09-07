import { authValidator } from "../components/authValidator";
import DashboardTemplate, { DashboardTitle } from "../components/dashboard";
import { redirect } from "next/navigation";


export default async function Dashboard() {
    let redirectUrl = await authValidator(true);
    if (typeof redirectUrl == "string") redirect(redirectUrl);
    return (
        <DashboardTemplate>
            <div className="w-full h-full p-14">
                <DashboardTitle title="Trending" description=""/>
            </div>
        </DashboardTemplate>
    )
}