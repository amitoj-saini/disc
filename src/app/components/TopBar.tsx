export default function TopBar() {
    return (
        <div className="w-full h-16 border-b grid-border grid grid-flow-row auto-rows-max">
            <div className="h-16 w-20 border-r grid-border flex justify-center items-center">
                <img src="/disc.png" alt="logo" width={35} height={35} />
            </div>
        </div>
    )
}