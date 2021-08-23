class IngYangGame {
    constructor(startPanel) {
        this.startPanel = startPanel;
        this.oldPanels = [];
        this.worldWidth = startPanel.panel[0].length;
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
            for (let j = 0; j < this.worldWidth; j++) {
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
            for (let j = 0; j < this.worldWidth; j++) {
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
            if (_x > this.worldHeight - 1 || _y > this.worldWidth - 1) continue;
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

export default IngYangGame;
