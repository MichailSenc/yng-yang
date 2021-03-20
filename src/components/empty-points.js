class EmptyPoints {
    constructor(sizeX, sizeY) {
        this.points = [];
        for (let i = 0; i < sizeX; i++) {
            for (let j = 0; j < sizeY; j++) {
                this.points.push([i, j]);
            }
        }
    }

    shuffle() {
        return this.points.sort(() => Math.random() - 0.5);
    }
}

export default EmptyPoints;
