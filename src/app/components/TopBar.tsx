import "../../styles/topbar.css";

export default function TopBar() {
    return (
        <div className="w-full h-16 px-5 sm:px-10 flex auto-cols-max flex items-center">
            <div className="flex">
                <img src="/disc.png" alt="logo" width={35} />
                <h1 style={{ backgroundImage: 'var(--gradient-main)' }} className="text-gradient text-xl font-light ml-2">Disc</h1>
            </div>
            <div className="flex justify-center text-center flex-grow ">
                <div className="center-nav-menu hidden sm:flex">
                    <div>About Us</div>
                    <div>How it works</div>
                    <div>Blog</div>
                </div>
            </div>
            <div className="flex">
                <button>Get Started</button>
                <button>Login</button>
            </div>
        </div>
    )
}