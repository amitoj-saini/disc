import TopBar from "./components/TopBar";
import "../styles/index.css";

export default function Home() {
    return (
        <main className="main">
            <TopBar></TopBar>
            <div className="w-full px-5 sm:px-10 flex">
                <div className="w-full mt-16 md:mt-25 lg:mt-32 xl:mt-44 flex justify-center">
                    <div>
                        <h1 style={{ backgroundImage: 'var(--gradient-second)' }} className="p-1 font-bold text-2xl md:text-3xl max-w-sm lg:text-4xl lg:max-w-xl xl:text-5xl xl:max-w-2xl 2xl:text-8xl 2xl:max-w-5xl text-gradient">The Simpler Way to Create Discord Bots</h1>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </main>
    )
}

/*
import TopBar from "./components/TopBar";
import "../styles/index.css";

export default function Home() {
    return (
        <main className="main">
            <TopBar></TopBar>
            <div className="bottom-container flex grid-flow-row auto-rows-max">
                <div className="w-20 border-r grid-border hidden sm:block"></div>
                <div className="grid-cols flex-grow flex justify-center">
                    <div className="mt-20 flex grid-cols-3">
                        <div className="col-span-3">
                            <h1 style={{ backgroundImage: 'var(--gradient-main)' }} className="p-1 font-bold text-2xl lg:text-4xl xl:text-5xl text-gradient">The Simpler Way to Create Discord Bots</h1>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div className="w-20 ml-auto border-l grid-border hidden sm:block"></div>
            </div>
        </main>
    )
}
*/