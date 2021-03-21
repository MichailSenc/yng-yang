class IngYangGame {
    constructor(startPanel) {
        this.startPanel = startPanel;
        this.panel = startPanel.panel;
        this.newPanel = startPanel.defaultMatrix();
        this.worldHeight = startPanel.panel.length;
    }

    nextGeneration() {
        let point;
        for (let i = 0; i < this.worldHeight; i++) {
            for (let j = 0; j < this.worldHeight; j++) {
                point = this.panel[i][j];
                let { countYng, conutYang, sum } = countLiveNeighbors(i, j);

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
            neighbors = pointNeighbors(x, y);

        neighbors.forEach((item) => {
            let [_x, _y] = item;
            if (_x < 0 || _y < 0) continue;
            if (_x > this.worldHeight || _y > this.worldHeight) continue;
            if (this.panel[_x][_y]) {
                if (this.panel[_x][_y] == "yng") {
                    countYng++;
                } else {
                    conutYang++;
                }
                sum++;
            }
        });
        return { countYng, conutYang, sum };
    }

    // количество живых клеток на поле
    getLiveCount() {
        let count = 0;
        this.panel.forEach((arr) => {
            arr.forEach((item) => item && count++);
        });
    }
}

export default IngYangGame;
