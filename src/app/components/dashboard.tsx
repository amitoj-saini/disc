"use client";

import { faArrowLeft, faArrowRight, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { ReactNode, useLayoutEffect, useState } from "react";
import "../../styles/dashboard.css";




export default function DashboardTemplate({children} : {children: ReactNode}) {
    const [shrinkMenu, shrinkMenuClicked] = useState(false);
    
    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            let shrinkMenuValue = localStorage.getItem("shrinkMenu") ? true : false;
            console.log(shrinkMenu != shrinkMenuValue)
            if (shrinkMenu != shrinkMenuValue) {
                shrinkMenuClicked(shrinkMenuValue);
            }
        }
    }, []);
    
    const setShrinkMenu = () => {
        let shrinkMenuValue = shrinkMenu ? false : true;
        if (shrinkMenuValue) localStorage.setItem("shrinkMenu", "true");
        else localStorage.removeItem("shrinkMenu");
        shrinkMenuClicked(shrinkMenuValue);
    }
    
    
    return (
        <main className="main flex overflow-hidden">
            <div className={`${shrinkMenu ? "shrunken-side-bar" : ""} side-bar flex flex-col h-full`}>
                <div style={{borderBottom: "solid 0.5px var(--border)"}} className="flex-none flex items-center h-16 px-3 w-full shrink-center">
                    <div className="logo-container rounded w-8 h-8 flex items-center justify-center">
                        <img src="/disc-light.png" alt="logo" width={20} />
                    </div>
                    <div className="ml-3 shrink-hide">
                        <h1 className="text-sm font-medium">Disc Dashboard</h1>
                        <p style={{color: "var(--gray)"}} className="font-thin text-xs">Home</p>
                    </div>
                </div>
                <div className="flex-grow">
                    
                </div>
                <div style={{borderTop: "solid 0.5px var(--border)"}} className="flex-none flex items-center h-16 shrink-center">
                    <button onClick={setShrinkMenu} className="p-0 w-6 h-6 flex items-center justify-center">
                        <FontAwesomeIcon className="w-3 h-2.5" style={{color: "var(--dark-gray)"}} icon={shrinkMenu ? faArrowRight : faArrowLeft}/>
                    </button>
                </div>
            </div>
            <div className="flex-1">
                {children}
            </div>
        </main>
    )
}

export function DashboardTitle({title, description} : {title: string, description: string}) {
    return (
        <div className="px-2">
            <h1 className="font-bold text-3xl">{title}</h1>
            <p style={{color: "var(--dark-gray);"}} className="text-xs mt-2">{description}</p>
        </div>
    )
}

export function Discs({discs}: {discs: { img: string; title: string; description: string }[]}) {
    
    return (
        <div className="w-full place-items-center text-center mt-8 grid gap-8 xs: grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {discs.map((disc) => (
                <div className="disc p-4">
                    <div className="flex items-center">
                        <div style={{backgroundColor: "var(--secondary)"}} className="flex justify-center items-center w-11 h-11 rounded-md">
                            <FontAwesomeIcon className="w-6 h-6" icon={faDiscord}/>
                        </div>
                        <h1 className="ml-4 font-thin">{disc.title}</h1>
                        <FontAwesomeIcon style={{color: "var(--dark-gray)"}} className="mb-auto ms-auto h-4 w-auto" icon={faEllipsis}/>
                    </div>

                    <div className="mt-4 ml-2 text-left">
                        <p style={{color: "var(--dark-gray)"}} className="text-sm font-thin">{disc.description}</p>
                    </div>

                    <div className="mt-4 ml-2 flex">
                        <button className="ml-0">Explore Disc</button>
                        <button className="opposite-button">Copy Disc</button>
                    </div>
                </div> 
            ))}
        </div>
    )
}