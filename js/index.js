import pointsGeneration from "./modules/points-generation";
import SrartPanel from "./modules/canvas";
import IngYangGame from "./modules/calc-yin-yang-points";
import { getDataFromLocalStorage, postDataToLocalStorage } from "./modules/local-storage";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    /* -------------------------------НАСТРОЙКИ---------------------------------------------------------------------- */
    const cell = 4;
    const settings = {
        cellSize: cell,
        width: Math.floor(650 / cell) * cell + 1,
        height: Math.floor(650 / cell) * cell + 1,
        cellType: "empty",
    };

    const colors = { empty: "#FFFFFF", yng: "#000000", yang: "#FF0000", grid: "black" };

    getDataFromLocalStorage();
    postDataToLocalStorage();

    /* -------------------------------ОТРИСОВКА_ПОЛОТНА-------------------------------------------------------------- */
    const startPanel = new SrartPanel(colors, settings);

    startPanel.setEventListeners();

    pointsGeneration(startPanel);

    container.appendChild(startPanel.canvas);
    container.appendChild(startPanel.grid);

    /* -------------------------------НАЧАЛО_ИГРЫ-------------------------------------------------------------------- */
    const startButton = document.querySelector("#start_button"),
        stopButton = document.querySelector("#stop_button"),
        dItems = document.querySelectorAll("[data-disalbe]"),
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
        curStep,
        interval;

    let game;

    stopButton.addEventListener("click", () => {
        // console.log(game.oldPanels);
        clearInterval(interval);
    });

    startButton.addEventListener("click", () => {
        // disable();
        if (!isStarted) {
            isStarted = true;
            report.innerText = "";
            curStep = 0;
            game = new IngYangGame(startPanel);
        }
        interval = setInterval(() => start(), 10);
    });

    function stopInterval(message) {
        clearInterval(interval);
        // allow();
        report.innerText = `${message}`;
        isStarted = false;
    }

    function start() {
        curStep++;
        let result = game.nextStep();
        if (result) {
            stopInterval(`${result.message}. Количество шагов: ${curStep}`);
            return;
        }
        if (game.getLiveCount() == 0) {
            stopInterval(`
                На поле не осталось ни одной «живой» клетки, количество шагов: ${curStep}`);
            return;
        }
        stepCount.innerText = `Step: ${curStep}`;
    }
});
