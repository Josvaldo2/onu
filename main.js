// Javascript para o contador de tempo da ONU, programado por Augusto V.

let counterInterval;
let startTime;
let counterStatus = false;

let minutes;
let seconds;

const minutesDisplay = document.getElementById("minutes-display");
const secondsDisplay = document.getElementById("seconds-display");
const timesList = document.getElementById("times-list")

function count() {
    const currentTime = new Date();
    const deltaTime = Math.floor((currentTime - startTime) / 1000);

    minutes = Math.floor(deltaTime/60);
    seconds = deltaTime%60

    minutesDisplay.textContent = minutes < 10 ? "0"+minutes : minutes;
    secondsDisplay.textContent = seconds < 10 ? "0"+seconds : seconds;
}

function mainCounterFunction() {
    if (!counterStatus) {
        startTime = new Date();
        counterStatus = true;
        counterInterval = setInterval(count, 20);
    }

    else {
        clearInterval(counterInterval);
        counterStatus = false;

        const lapDiv = document.createElement("div")
        lapDiv.textContent = `${minutes < 10 ? "0"+minutes : minutes}:${seconds < 10 ? "0"+seconds : seconds}`;
        timesList.appendChild(lapDiv);

        minutesDisplay.textContent = "00";
        secondsDisplay.textContent = "00";
    }
}

document.getElementById("main-button").onclick = mainCounterFunction;
