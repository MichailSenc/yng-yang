/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc-yin-yang-points.js":
/*!********************************************!*\
  !*** ./js/modules/calc-yin-yang-points.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class IngYangGame {
    constructor(startPanel) {
        this.startPanel = startPanel;
        this.oldPanels = [];
        this.worldHeight = startPanel.panel.length;
        this.count = 0;
    }

    // проверка конфигурации на зацикливание
    checkLoops() {
        for (let i = this.oldPanels.length - 1; i >= 0; i--) {
            if (this.isEqualMatix(this.startPanel.panel, this.oldPanels[i])) {
                return {
                    count: this.oldPanels.length - i,
                    message:
                        this.oldPanels.length - i == 1
                            ? `Данная конфигурация приняла стабильное состояние`
                            : `Зацикливание. Конфигурация повторилась на ${this.oldPanels.length - i} шаге цикла`,
                };
            }
        }
        return false;
    }

    // сравнивание двух матриц
    isEqualMatix(matrix1, matrix2) {
        for (let i = 0; i < this.worldHeight; i++) {
            for (let j = 0; j < this.worldHeight; j++) {
                if (matrix1[i][j] != matrix2[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    // выполнить переход
    nextStep() {
        this.startPanel.clearCanvas();
        this.nextGeneration();
        for (let i = 0; i < this.startPanel.panel.length; i++) {
            const element = this.startPanel.panel[i];
            for (let j = 0; j < element.length; j++) {
                const item = element[j];
                if (item) {
                    this.startPanel.settings.cellType = item;
                    this.startPanel.putCoordinateToCanvas(i, j);
                }
            }
        }
        return this.checkLoops();
    }

    // следующие поколение клеток
    nextGeneration() {
        let point;
        const newPanel = this.startPanel.defaultMatrix();
        for (let i = 0; i < this.worldHeight; i++) {
            for (let j = 0; j < this.worldHeight; j++) {
                point = this.startPanel.panel[i][j];
                let { countYng, conutYang, sum } = this.countLiveNeighbors(i, j);

                if (!point) {
                    if (sum == 3) {
                        if (countYng == 1) {
                            newPanel[i][j] = "yng";
                        } else if (conutYang == 1) {
                            newPanel[i][j] = "yang";
                        }
                    }
                } else {
                    if (
                        sum > 4 ||
                        sum < 2 ||
                        (point == "yng" && conutYang == 4) ||
                        (point == "yang" && countYng == 4)
                    ) {
                        continue;
                    } else {
                        newPanel[i][j] = point;
                    }
                }
            }
        }
        // Чтобы комп не взлетел надо сбросить кэш,
        if (this.oldPanels.length > 100 && this.count < 6) {
            this.count++;
            console.log("refresh!");
            this.oldPanels = [];
        }
        this.oldPanels.push(this.startPanel.panel);
        this.startPanel.panel = newPanel;
    }

    //  координаты соседей точки - окрестность мура 1 порядка
    pointNeighbors(x, y) {
        const neighbors = [];
        for (let i = x - 1; i <= x + 1; i++) {
            for (let j = y - 1; j <= y + 1; j++) {
                if (i == x && j == y) continue;
                neighbors.push([i, j]);
            }
        }
        return neighbors;
    }

    // количество живых соседей у клетки (x,y)
    countLiveNeighbors(x, y) {
        let countYng = 0,
            conutYang = 0,
            sum = 0,
            neighbors = this.pointNeighbors(x, y);

        for (const item of neighbors) {
            let [_x, _y] = item;
            if (_x < 0 || _y < 0) continue;
            if (_x > this.worldHeight - 1 || _y > this.worldHeight - 1) continue;
            if (this.startPanel.panel[_x][_y]) {
                if (this.startPanel.panel[_x][_y] == "yng") {
                    countYng++;
                } else {
                    conutYang++;
                }
                sum++;
            }
        }
        return { countYng, conutYang, sum };
    }

    // количество живых клеток на поле
    getLiveCount() {
        let count = 0;
        this.startPanel.panel.forEach((arr) => {
            arr.forEach((item) => item && count++);
        });
        return count;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IngYangGame);


/***/ }),

/***/ "./js/modules/canvas.js":
/*!******************************!*\
  !*** ./js/modules/canvas.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// создать полотно, сетку и добавить события для чекбоксов
class SrartPanel {
    constructor(colors, settings) {
        const { canvas, grid } = createStartPanel(colors, settings);
        this._settings = settings;
        this._colors = colors;
        this.canvas = canvas;
        this.grid = grid;
        this.panel;
        this.setDefaultMatrix();
    }

    // очистить полотно
    clearCanvas() {
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // обнулить матрицу панели
    setDefaultMatrix() {
        this.panel = this.defaultMatrix();
    }

    // создать пустую матрицу поля
    defaultMatrix() {
        const { width, height, cellSize } = this._settings,
            iMax = Math.floor(width / cellSize),
            jMax = Math.floor(height / cellSize),
            panel = [];

        for (let i = 0; i < iMax; i++) panel[i] = new Array(jMax);
        return panel;
    }

    putCoordinateToCanvas(x, y) {
        const { cellSize, cellType } = this._settings,
            ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this._colors[`${cellType}`];
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }

    putCoordinate({ x, y }) {
        const { cellSize, cellType } = this._settings,
            ctx = this.canvas.getContext("2d");
        this.panel[x / cellSize][y / cellSize] = cellType == "empty" ? null : cellType;
        ctx.fillStyle = this._colors[`${cellType}`];
        ctx.fillRect(x, y, cellSize, cellSize);
    }

    setEventListeners() {
        // Показать/убрать сетку
        const gridCheck = document.querySelector("#grid_checkbox"),
            canvasCheck = document.querySelector("#canvas_checkbox");

        if (!gridCheck.checked) this.grid.classList.add("hidden");
        if (!canvasCheck.checked) this.canvas.classList.add("hidden");

        gridCheck.addEventListener("input", () => {
            this.grid.classList.toggle("hidden");
        });
        // Показать/убрать полото
        canvasCheck.addEventListener("input", () => {
            this.canvas.classList.toggle("hidden");
        });

        document.querySelector("#clear_button").addEventListener("click", () => {
            this.clearCanvas();
            this.setDefaultMatrix();
        });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SrartPanel);


/***/ }),

/***/ "./js/modules/empty-points.js":
/*!************************************!*\
  !*** ./js/modules/empty-points.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class EmptyPoints {
    constructor(sizeX, sizeY) {
        this.points = [];
        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                this.points.push([i, j]);
            }
        }
    }

    // случайнное перемешиване массива - алгоритм Фишера-Йетса 
    shuffle(){
        let arr = this.points;
        let j, temp;
        for(let i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return this.points;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EmptyPoints);


/***/ }),

/***/ "./js/modules/local-storage.js":
/*!*************************************!*\
  !*** ./js/modules/local-storage.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDataFromLocalStorage": () => (/* binding */ getDataFromLocalStorage),
/* harmony export */   "postDataToLocalStorage": () => (/* binding */ postDataToLocalStorage)
/* harmony export */ });
function getAttributes() {
    return [
        document.querySelector("#count_alive"),
        document.querySelector("#yin_percent"),
        document.querySelector("#yang_percent"),
        document.querySelector("#grid_checkbox"),
        document.querySelector("#canvas_checkbox"),
    ];
}

function getDataFromLocalStorage() {
    getAttributes().forEach((item) => {
        let value = localStorage.getItem(item.getAttribute("id"));
        if (value) {
            if (item.getAttribute("type") === "checkbox") {
                item.checked = value == "true";
            } else {
                item.value = value;
            }
        }
    });
}

function postDataToLocalStorage() {
    getAttributes().forEach((item) => {
        if (item.getAttribute("type") === "checkbox") {
            item.addEventListener("change", () => {
                localStorage.setItem(item.getAttribute("id"), item.checked);
            });
        } else {
            item.addEventListener("change", () => {
                localStorage.setItem(item.getAttribute("id"), item.value);
            });
        }
    });
}




/***/ }),

/***/ "./js/modules/points-generation.js":
/*!*****************************************!*\
  !*** ./js/modules/points-generation.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _empty_points__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./empty-points */ "./js/modules/empty-points.js");


function pointsGeneration(startPanel, colors) {
    const canvas = startPanel.canvas,
        ctx = canvas.getContext("2d");
    let { width, height, cellSize } = startPanel.settings;

    /* -----------------------Рандомная генерация-------------------------------------------------*/
    function randomGeneration() {
        const percentYin = document.querySelector("#yin_percent"),
            percentYang = document.querySelector("#yang_percent"),
            countAlive = document.querySelector("#count_alive"),
            generButton = document.querySelector("#generate_button");

        function changePercent(param1, param2) {
            let value = +param2.value > 100 ? 100 : +param2.value < 0 ? 0 : +param2.value;
            param2.value = value;
            param1.value = 100 - value;
        }

        // input-ы в рандомной генерации
        percentYang.addEventListener("input", () => changePercent(percentYin, percentYang));
        percentYin.addEventListener("input", () => changePercent(percentYang, percentYin));
        countAlive.addEventListener("input", () => {
            let maxValue = Math.floor((width - 1) / cellSize) * Math.floor((height - 1) / cellSize),
                curValue = +countAlive.value;
            countAlive.value = curValue < 0 ? 0 : curValue > maxValue ? maxValue : +countAlive.value;
        });

        // кнопка генерации точек на полотне
        generButton.addEventListener("click", () => {
            if (!countAlive.value || !percentYin.value || !percentYang.value) {
                console.log("null check failed!!!");
                return;
            }

            let countYng = Math.round((+countAlive.value * +percentYin.value) / 100),
                countYang = +countAlive.value - countYng,
                maxSizeX = Math.floor((width - 1) / cellSize) * cellSize,
                maxSizeY = Math.floor((height - 1) / cellSize) * cellSize;

            // Сгенерировать масив рандомно перемешанных точек на плоскости
            const emptyPoints = new _empty_points__WEBPACK_IMPORTED_MODULE_0__.default(maxSizeX / cellSize, maxSizeY / cellSize).shuffle();

            // очищаем полотно
            startPanel.clearCanvas();
            startPanel.setDefaultMatrix();

            // ставим новые точки
            let prevCellType = startPanel.settings.cellType;
            startPanel.settings.cellType = "yng";
            for (let i = 0; i < countYng; i++) {
                let [x, y] = emptyPoints.pop().map((item) => item * cellSize);
                startPanel.putCoordinate({ x, y });
            }
            startPanel.settings.cellType = "yang";
            for (let i = 0; i < countYang; i++) {
                let [x, y] = emptyPoints.pop().map((item) => item * cellSize);
                startPanel.putCoordinate({ x, y });
            }
            startPanel.settings.cellType = prevCellType;
        });
    }

    /* -----------------------Пользовательская генерация------------------------------------------*/
    function customGeneration() {
        const radio = document.querySelectorAll('[name="radio"]');

        radio.forEach((item) => {
            item.addEventListener("change", (event) => (startPanel.settings.cellType = event.target.value));
        });

        // Координаты canvas относительно Window
        function windowToCanvas(canvas, x, y) {
            let bbox = canvas.getBoundingClientRect();
            x -= bbox.left * (canvas.width / bbox.width);
            y -= bbox.top * (canvas.height / bbox.height);
            return {
                x: Math.floor(x / cellSize) * cellSize,
                y: Math.floor(y / cellSize) * cellSize,
            };
        }

        canvas.addEventListener("mousedown", (e) => {
            startPanel.putCoordinate(windowToCanvas(e.target, e.clientX, e.clientY));
        });

        const canvasCoordinates = document.querySelector(".canvas_coordinates");
        canvas.addEventListener("mousemove", (e) => {
            let { x, y } = windowToCanvas(e.target, e.clientX, e.clientY);
            canvasCoordinates.innerHTML = `X: ${x / cellSize}; Y: ${y / cellSize}`;
        });
    }
    /* -------------------------------------------------------------------------------------------*/

    randomGeneration();
    customGeneration();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pointsGeneration);


/***/ }),

/***/ "./js/modules/start-game.js":
/*!**********************************!*\
  !*** ./js/modules/start-game.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _calc_yin_yang_points__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./calc-yin-yang-points */ "./js/modules/calc-yin-yang-points.js");


function startGame(startPanel) {
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
        isPaused = false,
        curStep,
        interval;

    let game;

    function eventStart() {
        if (!isStarted) {
            isStarted = true;
            report.innerText = "";
            curStep = 0;
            game = new _calc_yin_yang_points__WEBPACK_IMPORTED_MODULE_0__.default(startPanel);
            stopButton.innerText = "PAUSE";
            interval = setInterval(() => start(), 10);
        }
        if (isPaused) {
            isPaused = false;
            stopButton.innerText = "PAUSE";
            interval = setInterval(() => start(), 10);
        }
    }

    stopButton.addEventListener("click", () => {
        if (isStarted && !isPaused) {
            isPaused = true;
            clearInterval(interval);
            stopButton.innerText = "CONTINUE";
        } else if (isPaused && curStep > 0) {
            eventStart();
        }
    });

    startButton.addEventListener("click", eventStart);

    function stopInterval(message) {
        clearInterval(interval);
        // allow();
        report.innerText = `${message}`;
        isStarted = false;
        stopButton.innerText = "PAUSE";
    }

    function start() {
        curStep++;
        let result = game.nextStep();
        if (result) {
            stopInterval(`${result.message}. Количество шагов: ${curStep}`);
        } else if (game.getLiveCount() == 0) {
            stopInterval(`На поле не осталось ни одной «живой» клетки, количество шагов: ${curStep}`);
            return;
        }
        stepCount.innerText = `Step: ${curStep}`;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startGame);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_points_generation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/points-generation */ "./js/modules/points-generation.js");
/* harmony import */ var _modules_canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/canvas */ "./js/modules/canvas.js");
/* harmony import */ var _modules_start_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/start-game */ "./js/modules/start-game.js");
/* harmony import */ var _modules_local_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/local-storage */ "./js/modules/local-storage.js");





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

    (0,_modules_local_storage__WEBPACK_IMPORTED_MODULE_3__.getDataFromLocalStorage)();
    (0,_modules_local_storage__WEBPACK_IMPORTED_MODULE_3__.postDataToLocalStorage)();

    /* -------------------------------ОТРИСОВКА_ПОЛОТНА-------------------------------------------------------------- */
    const startPanel = new _modules_canvas__WEBPACK_IMPORTED_MODULE_1__.default(colors, settings);

    startPanel.setEventListeners();

    (0,_modules_points_generation__WEBPACK_IMPORTED_MODULE_0__.default)(startPanel);

    container.appendChild(startPanel.canvas);
    container.appendChild(startPanel.grid);

    /* -------------------------------НАЧАЛО_ИГРЫ-------------------------------------------------------------------- */
    (0,_modules_start_game__WEBPACK_IMPORTED_MODULE_2__.default)(startPanel);
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map