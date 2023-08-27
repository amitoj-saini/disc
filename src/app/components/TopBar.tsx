import "../../styles/topbar.css";
import Link from "next/link";

export default function TopBar() {
    return (
        <div className="w-full h-16 px-5 sm:px-10 flex auto-cols-max flex items-center">
            <Link href="/">
                <div className="flex items-center">
                    <img src="/disc.png" alt="logo" width={38} />
                    <h1 className="ml-3 font-bold">Disc</h1>    
                </div>
            </Link>           
            <div className="flex justify-center text-center flex-grow ">
                <div className="center-nav-menu hidden sm:flex">
                    <div>About Us</div>
                    <div>How it works</div>
                    <div>Blog</div>
                </div>
            </div>
            <div className="flex">
                <Link href="/signup">
                    <button>Get Started</button>
                </Link>
                <Link href="/login">
                    <button>Login</button>
                </Link>
            </div>
        </div>
    )
}