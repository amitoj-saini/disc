import TopBar from "./components/TopBar";
import "../styles/index.css";

export default function Home() {
    return (
        <main className="main">
            <TopBar></TopBar>
            <div className="w-full px-5 sm:px-10 flex">
                <div className="w-full mt-16 md:mt-25 lg:mt-26 xl:mt-40 flex justify-center flex-wrap">
                    <div className="flex justify-center items-center px-4 my-6 text-center w-full lg:w-auto xl:w-auto 2xl:w-auto">
                        <h1 style={{ backgroundImage: 'var(--gradient-second)' }} className="flex items-center p-1 font-bold text-2xl md:text-5xl max-w-sm lg:text-6xl lg:max-w-xl xl:text-7xl xl:max-w-2xl 2xl:text-8xl 2xl:max-w-5xl text-gradient">The Simpler Way to Create Discord Bots</h1>
                    </div>
                    <div className="px-4 my-6">
                        <img className="w-40 md:w-60 lg:w-80 xl:w-96" src="/create.png" alt="logo"/>
                    </div>
                </div>
            </div>
        </main>
    )
}