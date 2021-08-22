import IngYangGame from "./calc-yin-yang-points";

function startGame(startPanel) {
    const startButton = document.querySelector("#start-button"),
        stopButton = document.querySelector("#stop-button"),
        dItems = document.querySelectorAll("[data-disalbe]"),
        report = document.querySelector(".report"),
        stepCount = document.querySelector("#step-count");

    function disable() {
        for (const item of dItems) {
            item.classList.add(".disabled");
            item.disabled = true;
        }
    }

    function allow() {
        for (const item of dItems) {
            item.classList.remove(".disabled");
            item.disabled = false;
        }
    }

    let isStarted = false,
        isPaused = false,
        curStep,
        interval;

    let game;

    function eventStart() {
        if (!isStarted) {
            isStarted = true;
            report.innerText = "";
            report.classList.remove("_active");
            curStep = 0;
            game = new IngYangGame(startPanel);
            stopButton.innerText = "PAUSE";
            interval = setInterval(() => start(), 10);
        }
        if (isPaused) {
            isPaused = false;
            stopButton.innerText = "PAUSE";
            interval = setInterval(() => start(), 10);
        }
    }

    stopButton.addEventListener("click", () => {
        if (isStarted && !isPaused) {
            isPaused = true;
            clearInterval(interval);
            stopButton.innerText = "CONTINUE";
        } else if (isPaused && curStep > 0) {
            eventStart();
        }
    });

    startButton.addEventListener("click", eventStart);

    function stopInterval(message) {
        clearInterval(interval);
        // allow();
        report.innerText = `${message}`;
        report.classList.add("_active");
        isStarted = false;
        stopButton.innerText = "PAUSE";
    }

    function start() {
        curStep++;
        let result = game.nextStep();
        if (result) {
            stopInterval(`${result.message}. Количество шагов: ${curStep}`);
        } else if (game.getLiveCount() == 0) {
            stopInterval(`На поле не осталось ни одной «живой» клетки, количество шагов: ${curStep}`);
            return;
        }
        stepCount.innerText = `Step: ${curStep}`;
    }
}

export default startGame;
