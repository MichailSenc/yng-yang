import EmptyPoints from "./empty-points";

function pointsGeneration(panel, canvas, settings, colors) {
    const ctx = canvas.getContext("2d");
    let { width, height, cellSize, cellType } = settings;

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
            countAlive.value = +countAlive.value < 0 ? 0 : +countAlive.value;
        });

        // const maxX = Math.floor(width),
        //     maxY = Math.floor(height);

        //TODO написать обработку события рандомной генерации
        generButton.addEventListener("click", () => {
            if (!countAlive.value || !percentYin.value || !percentYang.value) {
                console.log("null check failed!!!");
                return;
            }

            let countYng = (+countAlive.value * +percentYin.value) / 100,
                countYang = +countAlive.value - countYng;

            let { maxSizeX, maxSizeY } = getMaxPointsCount(width - 1, height - 1);

            // Сренерировать масив перемешанных точек на плоскости

            canvas.style.backgroundColor = colors.empty;
            const emptyPoints = new EmptyPoints(maxSizeX / cellSize, maxSizeY / cellSize).shuffle();

            cellType = "yng";
            for (let i = 0; i < countYng; i++) {
                let [x, y] = emptyPoints.pop().map(item => item * cellSize);
                putCord({x,y});
            }
            cellType = "yang";
            for (let i = 0; i < countYang; i++) {
                let [x, y] = emptyPoints.pop().map(item => item * cellSize);
                putCord({x,y});
            }
            // console.log(panel);
        });
    }

    function putCord({ x, y }) {
        panel[x / cellSize][y / cellSize] = cellType;
        ctx.fillStyle = colors[`${cellType}`];
        ctx.fillRect(x, y, cellSize, cellSize);
    }

    function getUnicRandomCord(maxX, maxY) {
        let x = Math.floor(maxX / cellSize) * cellSize;
        let y = Math.floor(maxY / cellSize) * cellSize;

        if (panel[x / cellSize][y / cellSize]) {
            console.log("uniq");
            return getUnicRandomCord(maxX, maxY, panel);
        }

        // console.log(x, y);
        return {
            x,
            y,
        };
    }

    function getMaxPointsCount(maxX, maxY) {
        return {
            maxSizeX: Math.floor(maxX / cellSize) * cellSize,
            maxSizeY: Math.floor(maxY / cellSize) * cellSize,
        };
    }

    function customGeneration() {
        const radio = document.querySelectorAll('[name="radio"]'),
            typeButton = document.querySelector("#input_type_button");

        radio.forEach((item) => {
            item.addEventListener("change", (event) => (settings.cellType = cellType = event.target.value));
        });

        let typeButtonFlag = true;

        typeButton.addEventListener("click", () => {
            typeButton.innerText = typeButtonFlag ? "Установка точек мышкой" : "Ввести координаты";
            typeButtonFlag = !typeButtonFlag;
        });
    }

    function putPointsEvents() {
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
        
        canvas.addEventListener("mousedown", (e) => putCord(windowToCanvas(e.target, e.clientX, e.clientY)));

        const canvasCoordinates = document.querySelector(".canvas_coordinates");
        canvas.addEventListener("mousemove", (e) => {
            let { x, y } = windowToCanvas(e.target, e.clientX, e.clientY);
            canvasCoordinates.innerHTML = `X: ${x / cellSize}; Y: ${y / cellSize}`;
        });
    }

    randomGeneration();
    customGeneration();
    putPointsEvents();
}
export default pointsGeneration;
