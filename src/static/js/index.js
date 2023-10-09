function writingSimulators() {
    let texts = document.querySelectorAll("[type=writing-simulator]");
    
    texts.forEach((e) => {
        let reached = 0;
        let prefix = e.getAttribute("prefix");
        let text = e.getAttribute("text");
        let interval = setInterval(() => {
            reached++;
            if (reached == text.length) clearInterval(interval);
            e.innerHTML = prefix + text.substring(0, reached);
        }, parseInt(e.getAttribute("time")));
    })
}

window.addEventListener("load", () => {
    let topbarmenu = document.querySelector("#topbarnav")
    document.querySelector("#menubtn").addEventListener("click", () => topbarmenu.classList.toggle("hidden"));
    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("menubtnitem")) return;
        if (!topbarmenu.classList.contains("hidden")) topbarmenu.classList.toggle("hidden");
    });

    writingSimulators();
});