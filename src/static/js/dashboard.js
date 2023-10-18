const verifacationResendLimit = 80000; // ms
let cantSendVerifacation = false;

const verifacationLimiter = (seconds, interval) => {
    cantSendVerifacation = true
    let verifacationSpan = document.querySelector("#resendverifacation");
    verifacationSpan.innerText = `(Resend in ${Math.floor((verifacationResendLimit - seconds)/1000)})`
    verifacationSpan.classList.add("hover:line-through");
    console.log(seconds, verifacationResendLimit)
    if (seconds >= verifacationResendLimit) {
        cantSendVerifacation = false;
        verifacationSpan.innerText = "(Click to Resend)";
        verifacationSpan.classList.remove("hover:line-through");
        if (interval) clearInterval(interval);
    }
}

const sendVerifacationCode = () => {
    if (cantSendVerifacation) return;
    fetch("/api/resendverifacation");
    let seconds = 0;
    verifacationLimiter(seconds);
    let interval = setInterval(
        () => {
            seconds += 1000
            verifacationLimiter(seconds, interval)
        }, 1000);
}

const getCodeLastSent = () => {
    fetch("/api/codelastsent")
    .then(res => res.json())
    .then(data => {
        if (data.wait == 0) return;
        let seconds = verifacationResendLimit - data.wait
        verifacationLimiter(seconds);
        let interval = setInterval(
            () => {
                seconds += 1000
                verifacationLimiter(seconds, interval)
            }, 1000);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    // before verified
    let verifacationPending = document.querySelector("#resendverifacation")
    if (verifacationPending) {
        getCodeLastSent();
        verifacationPending.addEventListener("click", sendVerifacationCode);
    }
    // after verified
})