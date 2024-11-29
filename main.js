// Javascript para o contador de tempo da ONU, programado por Augusto V.

let counterInterval;
let startTime;
let counterStatus = false;

let minutes;
let seconds;

const minutesDisplay = document.getElementById("minutes-display");
const secondsDisplay = document.getElementById("seconds-display");
const timesList = document.getElementById("times-list");
const mainButton = document.getElementById("main-button");
const saveButton = document.getElementById("save-button");

function count() {
    const currentTime = new Date();
    const deltaTime = Math.floor((currentTime - startTime) / 1000);

    minutes = Math.floor(deltaTime/60);
    seconds = deltaTime%60;

    minutesDisplay.textContent = String(minutes).padStart(2, "0");
    secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function mainCounterFunction() {
    if (!counterStatus) {
        startTime = new Date();
        counterStatus = true;
        counterInterval = setInterval(count, 20);
        mainButton.innerText = "Parar";
    }

    else {
        clearInterval(counterInterval);
        counterStatus = false;

        const lapDiv = document.createElement("div");
        lapDiv.className = "times-arrangement"
        const countString = `${minutes < 10 ? "0"+minutes : minutes}:${seconds < 10 ? "0"+seconds : seconds}`;
        const countStartString = `${String(startTime.getHours()).padStart(2, '0')}:${String(startTime.getMinutes()).padStart(2, '0')}`
        

        lapDiv.innerHTML = `<span class="lap-name" contenteditable="true"></span>
                              <span class="lap-duration" contenteditable="true">${countString}</span>
                              <span class="lap-start" contenteditable="true">${countStartString}</span>
                              <span class="erase-lap" onclick="eraseLap(this)">Apagar contagem</span>`;
        timesList.appendChild(lapDiv);

        minutesDisplay.textContent = "00";
        secondsDisplay.textContent = "00";
        mainButton.innerText = "Iniciar";
    }
}

function eraseLap(element) {
    const parentDiv = element.closest(".times-arrangement");
    if (parentDiv) {
        parentDiv.remove();
    }
}

function saveToFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function saveTimesArrangementToFile() {
    
    const arrangements = document.querySelectorAll('.times-arrangement');
    let output = [];

    arrangements.forEach(arrangement => {
        
        const children = arrangement.children;

        if (children.length >= 3) {
            const first = children[0].textContent.trim();
            const second = children[1].textContent.trim();
            const third = children[2].textContent.trim();

            output.push(`${first}, ${second}, ${third}`);
        }
    });

    const fileContent = output.join('\n');

    saveToFile('times-arrangement.txt', fileContent);
}

saveButton.onclick = saveTimesArrangementToFile
mainButton.onclick = mainCounterFunction;

console.log("%cProgramado por Augusto V.\nT. 201", "color: cyan; font-size: 35px");