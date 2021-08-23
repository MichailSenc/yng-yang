import pointsGeneration from "./modules/points-generation";
import SrartPanel from "./modules/canvas";
import startGame from "./modules/start-game";
import { getDataFromLocalStorage, postDataToLocalStorage } from "./modules/local-storage";

const getData = async () => {
    try {
        const response = await fetch("../data/settings.json", {
            method: "GET",
            credentials: "same-origin",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // let settingsJSON = await
    // getData().then((json) => {
    //     console.log(json);
    //     settingsJSON = json;
    // });
    const settingsJSON = getData();
    console.log(settingsJSON);
    /* -------------------------------НАСТРОЙКИ---------------------------------------------------------------------- */
    const container = document.querySelector("#container");
    const cell = 4;
    const settings = {
        cellSize: cell,
        width: Math.floor(container.clientWidth / cell) * cell + 1,
        height: Math.floor(container.clientHeight / cell) * cell + 1,
        cellType: "empty",
    };

    const colors = { empty: "#FFFFFF", yng: "#000000", yang: "#FF0000", grid: "rgb(0,0,0,0.3)" };

    getDataFromLocalStorage();
    postDataToLocalStorage();

    /* -------------------------------ОТРИСОВКА_ПОЛОТНА-------------------------------------------------------------- */
    const startPanel = new SrartPanel(colors, settings);

    startPanel.setEventListeners();

    pointsGeneration(startPanel);

    /* -------------------------------НАЧАЛО_ИГРЫ-------------------------------------------------------------------- */
    startGame(startPanel);
});
