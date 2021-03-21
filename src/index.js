// import "materialize-css";
import pointsGeneration from "./components/points-generation";
import SrartPanel from "./components/canvas";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    const cell = 6;
    const settings = {
        cellSize: cell,
        width: Math.floor(750/cell) * cell + 1,
        height: Math.floor(750/cell) * cell + 1, 
        cellType: "empty",
    };

    // console.log(settings);

    const colors = { empty: "#D3D3D3", yng: "#008000", yang: "#FF0000", grid: "black" };
    const startPanel = new SrartPanel(colors, settings);

    startPanel.start();

    pointsGeneration(startPanel);

    container.appendChild(startPanel.canvas);
    container.appendChild(startPanel.grid);

    function start(params) {}
});
