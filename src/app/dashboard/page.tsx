import DashboardTemplate, { DashboardTitle, Discs } from "../components/dashboard";
import { authValidator } from "../components/authValidator";
import { redirect } from "next/navigation";


export default async function Dashboard() {
    let redirectUrl = await authValidator(true);
    if (typeof redirectUrl == "string") redirect(redirectUrl);
    return (
        <DashboardTemplate>
            <div className="overflow-auto w-full h-full p-14">
                <DashboardTitle title="Trending" description=""/>
                <Discs discs={Array.from({ length: 16 }, () => ({ img: "", title: "Some Disc", description: "QuantumBot is a multifunctional Discord bot that offers moderation tools, music streaming, customizable server commands, and a helpful support community. Elevate your server experience today!" }))}></Discs>
            </div>
        </DashboardTemplate>
    )
}


/*
<div className="w-full place-items-center text-center mt-8 grid gap-8 xs: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 20 }, (_, index) => (
                        <Disc img="" title="Some Disc" description="A versatile Discord bot, offering moderation, music, games, and more to enhance your server's experience."/>
                    ))}
                </div>*/