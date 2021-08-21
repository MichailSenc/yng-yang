import pointsGeneration from "./modules/points-generation";
import SrartPanel from "./modules/canvas";
import startGame from "./modules/start-game";
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
    startGame(startPanel);
});
