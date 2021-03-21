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

export default EmptyPoints;
