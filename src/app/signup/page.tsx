"use client";

import { formDataRequest } from "../utils/functions";
import TopBar from "../components/TopBar";
import Loader from "../components/Loader";
import "../../styles/index.css";
import { useState } from "react";

export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false);

    const responseHandler = (res: any) => {
        setIsLoading(false);
        console.log(res)
    }

    return (
        <main className="main">
            <TopBar></TopBar>
            <div style={{height: "calc(100% - 64px)"}} className="flex justify-center items-center">
                <div>
                    <div className="flex items-center justify-center">
                        <img src="/disc.png" alt="logo" width={40} />
                        <h1 className="ml-5 text-xl font-light">Welcome to Disc</h1>    
                    </div>
                    <form onSubmit={formDataRequest("/api/signup", (() => setIsLoading(true)), responseHandler)}>
                        <div className="mt-10">
                            <label>Name</label>
                            <input name="name" id="name" placeholder="Enter Name" required></input>
                            <label>Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter Email" required></input>
                            <label>Username</label>
                            <input name="username" id="username" placeholder="Enter Username" required></input>
                            <label>Password</label>
                            <input name="password" id="password" type="password" placeholder="Enter Password" required></input>
                            <div className="flex mt-8">
                                <div className="w-3/4">
                                    <button className="m-0 w-full">Sign Up</button>
                                </div>
                                <div className="w-1/4 flex justify-center items-center">
                                    {isLoading && <Loader />}
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}