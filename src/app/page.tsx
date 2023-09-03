import { authValidator } from "./components/authValidator";
import { redirect } from "next/navigation";
import TopBar from "./components/TopBar";
import "../styles/index.css";
import "../styles/stars.css";


export default async function Home() {
    let redirectUrl = await authValidator(false);
    if (typeof redirectUrl == "string") redirect(redirectUrl);
    return (
        <main className="main overflow-hidden">
            <TopBar></TopBar>
            <div id="stars"></div>
            <div style={{marginLeft: "2000px"}} id="stars"></div>
            <div className="flex w-full justify-center mt-16 md:mt-25 lg:mt-26 xl:mt-40">
                <h1 style={{ backgroundImage: 'var(--main-gradient)' }} className="max-w-7xl 2xl:max-w-7xl md:max-w-2xl lg:max-w-4xl text-center p-1 font-bold text-2xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-gradient">Launching your Discord Experience to Space!</h1>
            </div>
        </main>
    )
}