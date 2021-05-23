import IngYangGame from "./calc-yin-yang-points";

function startGame(startPanel) {
    const startButton = document.querySelector("#start_button"),
        stopButton = document.querySelector("#stop_button"),
        nextStepButton = document.querySelector("#next_step_button"),
        generButton = document.querySelector("#generate_button"),
        clearButton = document.querySelector("#clear_button"),
        dItems = document.querySelectorAll("[data-disalbe]"),
        curCountAlive = document.querySelector("#cur_live_count"),
        report = document.querySelector(".report"),
        stepCount = document.querySelector(".step_count");

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
    nextStepButton.addEventListener("click", () => {
        if (!isStarted) {
            isStarted = true;
            isPaused = true;
            report.innerText = "";
            curStep = 0;
            game = new IngYangGame(startPanel);
            stopButton.innerText = "PAUSE";
        }
        start();
    });

    function stopGame() {
        isStarted = false;
        isPaused = false;
        if (interval) clearInterval(interval);
        report.innerText = "";
        curStep = 0;
        stopButton.innerText = "PAUSE";
    }

    generButton.addEventListener('click', stopGame);
    clearButton.addEventListener('click', stopGame);

    function stopInterval(message) {
        clearInterval(interval);
        // allow();
        report.innerText = `${message}`;
        isStarted = false;
        stopButton.innerText = "PAUSE";
    }

    function start() {
        curStep++;
        let result = game.nextStep();
        curCountAlive.innerText = `Живые клетки: ${game.getLiveCount()}`;
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
