"use client";

import fetchDataRequest from "../components/functions";
import TopBar from "../components/TopBar";
import "../../styles/index.css";

export default function SignUp() {
    
    return (
        <main className="main">
            <TopBar></TopBar>
            <div style={{height: "calc(100% - 64px)"}} className="flex justify-center items-center">
                <div>
                    <div className="flex items-center justify-center">
                        <img src="/disc.png" alt="logo" width={40} />
                        <h1 className="ml-5 text-xl font-light">Welcome to Disc</h1>    
                    </div>
                    <form onSubmit={fetchDataRequest("/api/signup")}>
                        <div className="mt-10">
                            <label>Name</label>
                            <input name="name" id="name" placeholder="Enter Name" required></input>
                            <label>Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter Email" required></input>
                            <label>Username</label>
                            <input name="username" id="username" placeholder="Enter Username" required></input>
                            <label>Password</label>
                            <input name="password" id="password" type="password" placeholder="Enter Password" required></input>
                            <button className="ml-0 mt-8 w-full">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}