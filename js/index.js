import pointsGeneration from "./modules/points-generation";
import SrartPanel from "./modules/canvas";
import IngYangGame from "./modules/calc-yin-yang-points";
import { getDataFromLocalStorage, postDataToLocalStorage } from "./modules/local-storage";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    /* -------------------------------НАСТРОЙКИ---------------------------------------------------------------------- */
    const cell = 5;
    const settings = {
        cellSize: cell,
        width: Math.floor(750 / cell) * cell + 1,
        height: Math.floor(750 / cell) * cell + 1,
        cellType: "empty",
    };

    const colors = { empty: "#FFFFFF", yng: "#000000", yang: "#FF0000", grid: "black" };
    // const colors = { empty: "#D3D3D3", yng: "#008000", yang: "#FF0000", grid: "black" };

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
        dItems = document.querySelectorAll("[data-disalbe]"),
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

    startButton.addEventListener("click", () => {
        // disable();
        isStarted = true;
        curStep = 0;
        game = new IngYangGame(startPanel);
        interval = setInterval(() => start(), 10);
    });

    function start() {
        curStep++;
        game.nextStep();
        if (game.getLiveCount() == 0) {
            clearInterval(interval);
            // allow();
            isStarted = false;
        }
        stepCount.innerHTML = `Step: ${curStep}`;
    }
});
