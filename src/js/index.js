import "./script";
import pointsGeneration from "./modules/points-generation";
import SrartPanel from "./modules/startPanel";
import startGame from "./modules/start-game";
import * as localData from "./modules/local-storage";

document.addEventListener("DOMContentLoaded", () => {
    /* -------------------------------НАСТРОЙКИ---------------------------------------------------------------------- */
    const container = document.querySelector("#container");
    const {cell, empty, yng, yang, grid} = localData.getSettingsData();
    const settings = {
        cellSize: cell,
        width: Math.floor(container.clientWidth / cell) * cell + 1,
        height: Math.floor(container.clientHeight / cell) * cell + 1,
        cellType: "empty",
    };

    const colors = {empty, yng, yang, grid};

    localData.getDataFromLocalStorage();
    localData.postDataToLocalStorage();

    ["#settings-yng-color", "#settings-yang-color", "#settings-grid-color"].forEach((selector, i) => {
        document.querySelector(selector).addEventListener("change", (e) => {
            switch (i) {
                case 0:
                    colors.yng = e.target.value;
                    startPanel.printCoordinates(colors);
                    break;
                case 1:
                    colors.yang = e.target.value;
                    break;
                case 2:
                    colors.grid = e.target.value;
                    break;
            }
            startPanel.printGrid(colors);
            startPanel.printCoordinates(colors);
        });
    });

    /* -------------------------------ОТРИСОВКА_ПОЛОТНА-------------------------------------------------------------- */
    const startPanel = new SrartPanel(colors, settings);

    startPanel.setEventListeners();

    pointsGeneration(startPanel);

    /* -------------------------------НАЧАЛО_ИГРЫ-------------------------------------------------------------------- */
    startGame(startPanel);
});
