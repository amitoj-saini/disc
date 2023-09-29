/*const toggleMenu = (e) => {
    //if (e.target.classList.contains("menubtnitem")) return;
    
}*/
window.addEventListener("load", () => {
    let topbarmenu = document.querySelector("#topbarnav")
    document.querySelector("#menubtn").addEventListener("click", () => topbarmenu.classList.toggle("hidden"));
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("menubtnitem")) return;
        topbarmenu.classList.toggle("hidden");
    });
})
