document.addEventListener("DOMContentLoaded", function () {
    const playButton = document.querySelector(".play");
    const resetButton = document.querySelector(".reset");
    const lapButton = document.querySelector(".lap");
    const lapClearButton = document.querySelector(".lap-clear-button");

    const minuteElement = document.querySelector(".minute");
    const secElement = document.querySelector(".sec");
    const msecElement = document.querySelector(".msec");
    const lapsElement = document.querySelector(".laps");

    let minute = 0, sec = 0, msec = 0;
    let timerInterval;
    let isRunning = false;

    function updateStopwatch() {
        msec++;
        if (msec >= 100) {
            msec = 0;
            sec++;
        }
        if (sec >= 60) {
            sec = 0;
            minute++;
        }
        minuteElement.textContent = minute < 10 ? `0${minute}` : minute;
        secElement.textContent = sec < 10 ? ` : 0${sec}` : ` : ${sec}`;
        msecElement.textContent = msec < 10 ? ` . 0${msec}` : ` . ${msec}`;
    }

    function startStopwatch() {
        if (!isRunning) {
            timerInterval = setInterval(updateStopwatch, 10);
            playButton.textContent = "Pause";
            lapButton.classList.remove("hidden");
            resetButton.classList.remove("hidden");
            isRunning = true;
        } else {
            clearInterval(timerInterval);
            playButton.textContent = "Play";
            isRunning = false;
        }
    }

    function resetStopwatch() {
        clearInterval(timerInterval);
        minute = 0;
        sec = 0;
        msec = 0;
        isRunning = false;
        minuteElement.textContent = "00";
        secElement.textContent = " : 00";
        msecElement.textContent = " . 00";
        playButton.textContent = "Play";
        lapButton.classList.add("hidden");
        resetButton.classList.add("hidden");
        lapsElement.innerHTML = "";
    }

    function addLap() {
        const lapItem = document.createElement("li");
        lapItem.classList.add("lap-item");
        lapItem.innerHTML = `
            <span class="number">#${lapsElement.children.length + 1}</span>
            <span class="time-stamp">${minute < 10 ? `0${minute}` : minute} : ${sec < 10 ? `0${sec}` : sec} : ${msec < 10 ? `0${msec}` : msec}</span>
        `;
        lapsElement.appendChild(lapItem);
    }

    function clearLaps() {
        lapsElement.innerHTML = "";
    }

    playButton.addEventListener("click", startStopwatch);
    resetButton.addEventListener("click", resetStopwatch);
    lapButton.addEventListener("click", addLap);
    lapClearButton.addEventListener("click", clearLaps);
});
