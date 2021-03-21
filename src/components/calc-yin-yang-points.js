class IngYangGame {
    constructor(startPanel) {
        this.startPanel = startPanel;
        this.newPanel = startPanel.defaultMatrix();
        this.worldHeight = startPanel.panel.length;
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
    }

    // следующие поколение клеток
    nextGeneration() {
        let point;
        for (let i = 0; i < this.worldHeight; i++) {
            for (let j = 0; j < this.worldHeight; j++) {
                point = this.startPanel.panel[i][j];
                let { countYng, conutYang, sum } = this.countLiveNeighbors(i, j);

                if (!point) {
                    if (sum == 3) {
                        this.newPanel[i][j] = countYng == 1 ? "yng" : "yang";
                    }
                } else {
                    if (sum > 4 || sum < 2) {
                        this.newPanel[i][j] = null;
                        continue;
                    }
                    if (point == "yng" && conutYang == 4) {
                        this.newPanel[i][j] = null;
                        continue;
                    }
                    if (point == "yang" && countYng == 4) {
                        this.newPanel[i][j] = null;
                        continue;
                    }
                }
            }
        }
        this.startPanel.panel = this.newPanel;
        this.newPanel = this.startPanel.defaultMatrix();
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

export default IngYangGame;
