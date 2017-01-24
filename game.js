'use strict';

function randomInt (ceiling) {
    return Math.floor(Math.random() * ceiling);
}

function randomCoordinate (width, height) {
    return {
        x: randomInt(width),
        y: randomInt(height)
    };
}

const game = {
    grid: [],
    width: 10,
    height: 10,
    getCellCount: function () {
        return this.height * this.width;
    },
    getBlankGrid: function () {
        const myWidth = this.width;
        return new Array(this.height).fill(0).map(function () {
            return new Array(myWidth).fill(0);
        });
    },
    reset: function () {
        this.grid = this.getBlankGrid();
    },
    populate: function (population) {
        this.reset();
        for (let i = 0; i < Math.min(this.getCellCount(), population); i++) {
            const pos = randomCoordinate(this.width, this.height);
            if (this.grid[pos.x][pos.y] === 1) {
                i--;
            } else {
                this.grid[pos.x][pos.y] = 1;
            }
        }
    },
    createLife: function (x, y) {
        this.grid[x][y] = 1;
    },
    countNeighbors: function (x, y) {
        let count = 0;
        for (let i = Math.max(x - 1, 0); i <= Math.min(x + 1, 9); i++) {
            for (let j = Math.max(y - 1, 0); j <= Math.min(y + 1, 9); j++) {
                count += this.grid[i][j];
            }
        }
        return count - this.grid[x][y];
    },
    cycleGeneration: function () {
        const nextGen = this.getBlankGrid();
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                const neighborCount = this.countNeighbors(i, j);
                if (this.grid[i][j] === 0) {
                    nextGen[i][j] = neighborCount === 3 ? 1 : 0;
                } else {
                    nextGen[i][j] = neighborCount === 2 || neighborCount === 3 ? 1 : 0;
                }
            }
        }
        this.grid = nextGen;
    }
};

//noinspection JSUnresolvedVariable
module.exports = game;