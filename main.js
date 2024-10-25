let time = 0;
let counterStatus = false;

let secondsDisplay = document.getElementById("seconds-display")
let minutesDisplay = document.getElementById("minutes-display")

function count() {
    time++;
    seconds = time%60;
    minutes = Math.floor(time/60)

    secondsDisplay.textContent = seconds < 10 ? "0"+seconds : seconds;
    minutesDisplay.textContent = minutes < 10 ? "0"+minutes : minutes;
}

function mainCounterFunction() {
    if (counterStatus == false) {
        setInterval(count, 1000);
        counterStatus = true;
    }
}

document.getElementById("start-button").onclick = mainCounterFunction;
