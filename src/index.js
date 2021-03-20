// import "materialize-css";
import pointsGeneration from "./components/points-generation";
import createStartPanel from "./components/canvas";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("#container");
    const settings = { width: 750, height: 750, cellSize: 7, cellType: "empty" };
    const colors = { empty: "#D3D3D3", yng: "#008000", yang: "#FF0000", grid: "black" };
    const { canvas, grid, panel } = createStartPanel(colors, settings);

    pointsGeneration(panel, canvas, settings, colors);

    // document.querySelector("#generate_button").addEventListener("click", () => console.log(panel));

    container.appendChild(canvas);
    container.appendChild(grid);

    function start(params) {}
});
