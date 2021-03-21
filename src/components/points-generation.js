import EmptyPoints from "./empty-points";

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
            const emptyPoints = new EmptyPoints(maxSizeX / cellSize, maxSizeY / cellSize).shuffle();

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
export default pointsGeneration;
