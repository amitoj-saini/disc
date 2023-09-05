import "../../styles/dashboard.css";

export default async function DashboardTemplate() {
    return (
        <main className="main overflow-hidden">
            <div className="side-bar flex flex-col h-full">
                <div style={{borderBottom: "solid 0.5px var(--border)"}} className="flex-none flex items-center h-16 px-3 w-full">
                    <div className="logo-container rounded w-8 h-8 flex items-center justify-center">
                        <img src="/disc-light.png" alt="logo" width={20} />
                    </div>
                    <div className="ml-3">
                        <h1 className="text-sm font-medium">Disc Dashboard</h1>
                        <p style={{color: "var(--gray)"}} className="font-thin text-xs">Home</p>
                    </div>
                </div>
                <div className="flex-grow">

                </div>
                <div style={{borderTop: "solid 0.5px var(--border)"}} className="flex-none flex items-center h-16">
                    
                </div>
            </div>
        </main>
    )
}