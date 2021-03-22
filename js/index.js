import pointsGeneration from "./modules/points-generation";
import SrartPanel from "./modules/canvas";
import IngYangGame from "./modules/calc-yin-yang-points";
import { getDataFromLocalStorage, postDataToLocalStorage } from "./modules/local-storage";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    /* -------------------------------НАСТРОЙКИ---------------------------------------------------------------------- */
    const cell = 7;
    const settings = {
        cellSize: cell,
        width: Math.floor(750 / cell) * cell + 1,
        height: Math.floor(750 / cell) * cell + 1,
        cellType: "empty",
    };

    const colors = { empty: "#D3D3D3", yng: "#008000", yang: "#FF0000", grid: "black" };

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
        stepCount = document.querySelector(".step_count");
    let isStarted = false,
        curStep,
        interval;

    let game;

    startButton.addEventListener("click", () => {
        isStarted = true;
        curStep = 0;
        game = new IngYangGame(startPanel);
        interval = setInterval(() => start(), 100);
    });

    function start() {
        curStep++;
        game.nextStep();
        if (game.getLiveCount() == 0) {
            clearInterval(interval);
            isStarted = false;
        }
        stepCount.innerHTML = `Step: ${curStep}`;
    }
});
