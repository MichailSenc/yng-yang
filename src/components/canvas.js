// создать полотно, сетку и добавить события для чекбоксов

class SrartPanel {
    constructor(colors, settings) {
        this.canvas = createCanvas(),
        this.grid = createGrid(),
        this.panel = defaultMatrix(settings);
    }
}

function createStartPanel(colors, settings) {
    const { width, height, cellSize } = settings;
    // сетка canvas
    function createGrid() {
        const cnv = document.createElement("canvas");
        cnv.id = "grid_canvas";
        cnv.width = width;
        cnv.height = height;
        let ctx = cnv.getContext("2d");
        ctx.strokeStyle = colors.grid;
        let w = cnv.width - 1;
        let h = cnv.height - 1;
        for (let x = 0; x < w; x += cellSize) ctx.strokeRect(x, 0, 0.1, h);
        for (let y = 0; y < h; y += cellSize) ctx.strokeRect(0, y, w, 0.1);
        return cnv;
    }

    // основное полотно
    function createCanvas() {
        const cnv = document.createElement("canvas");
        cnv.classList.add("background");
        cnv.classList.add("transparency");
        cnv.id = "canvas";
        cnv.width = width;
        cnv.height = height;
        cnv.style.backgroundColor = colors.empty;
        return cnv;
    }

    function canvasCheckboxEvents(canvas, grid) {
        // Показать/убрать сетку
        document.querySelector("#grid_checkbox").addEventListener("input", () => {
            grid.classList.toggle("hidden");
        });

        // Показать/убрать полото
        document.querySelector("#canvas_checkbox").addEventListener("input", () => {
            canvas.classList.toggle("hidden");
        });
    }

    const canvas = createCanvas(),
        grid = createGrid(),
        panel = defaultMatrix(settings);

    // отчистить полотно
    document.querySelector("#clear_button").addEventListener("click", () => clearCanvas(canvas, panel, settings));

    canvasCheckboxEvents(canvas, grid);

    return {
        canvas,
        grid,
        panel,
    };
}

function clearCanvas(canvas, panel, settings) {
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    panel = defaultMatrix(settings);
}

// пустая матрица (чистое поле)
function defaultMatrix(settings) {
    const { width, height, cellSize } = settings,
        iMax = Math.floor(width / cellSize),
        jMax = Math.floor(height / cellSize),
        panel = [];

    for (let i = 0; i < iMax; i++) panel[i] = new Array(jMax);

    return panel;
}

export default createStartPanel;
export { clearCanvas };
