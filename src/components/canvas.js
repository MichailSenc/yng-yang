// создать полотно, сетку и добавить события для чекбоксов
class SrartPanel {
    constructor(colors, settings) {
        const { canvas, grid } = createStartPanel(colors, settings);
        this._settings = settings;
        this.canvas = canvas;
        this.grid = grid;
        this.panel;
        this.setDefaultMatrix();
    }

    // очистить полотно
    clearCanvas() {
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.panel = this.setDefaultMatrix(this._settings);
    }

    // обнулить матрицу панели
    setDefaultMatrix() {
        const { width, height, cellSize } = this._settings,
            iMax = Math.floor(width / cellSize),
            jMax = Math.floor(height / cellSize),
            panel = [];

        for (let i = 0; i < iMax; i++) panel[i] = new Array(jMax);
        this.panel = panel;
    }

    start() {
        // Показать/убрать сетку
        document.querySelector("#grid_checkbox").addEventListener("input", () => {
            this.grid.classList.toggle("hidden");
        });
        // Показать/убрать полото
        document.querySelector("#canvas_checkbox").addEventListener("input", () => {
            this.canvas.classList.toggle("hidden");
        });

        document.querySelector("#clear_button").addEventListener("click", () => this.clearCanvas());
    }

    set settings(value) {
        this._settings = value;
    }

    get settings() {
        return this._settings;
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

    return {
        canvas: createCanvas(),
        grid: createGrid(),
    };
}

export default SrartPanel;
