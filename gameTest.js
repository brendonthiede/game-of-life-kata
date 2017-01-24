'use strict';

const game = require('./game.js');

describe('Game', function () {
    beforeEach(function () {
        game.reset();
    });

    it('has a square grid', function () {
        game.grid.length.should.be.equal(10);
        game.grid[0].length.should.be.equal(10);
        game.getCellCount().should.be.equal(100);
    });

    it('has some life', function () {
        game.populate(5);
        game.grid.reduce(function (total, row) {
            return total + row.reduce(function (rowTotal, cell) {
                    return rowTotal + cell;
                }, 0);
        }, 0).should.be.equal(5);
    });

    it('it can create life', function () {
        game.createLife(0, 0);
        game.grid[0][0].should.be.equal(1);
    });

    it('can count neighbors of a cell', function () {
        game.reset();
        game.countNeighbors(0, 0).should.be.equal(0);
        game.createLife(0, 0);
        game.countNeighbors(0, 0).should.be.equal(0);
        game.createLife(0, 1);
        game.countNeighbors(0, 0).should.be.equal(1);
    });

    describe('Rules', function () {
        beforeEach(function () {
            game.reset();

            game.createLife(1, 1);
            game.createLife(0, 1);
            game.createLife(1, 0);
            game.createLife(2, 1);
            game.createLife(1, 2);

            game.cycleGeneration();
        });

        it('kill over populated cells', function () {
            game.grid[1][1].should.be.equal(0);
        });

        it('reproduce to empty cells', function () {
            game.grid[0][0].should.be.equal(1);
            game.grid[0][2].should.be.equal(1);
            game.grid[2][0].should.be.equal(1);
            game.grid[2][2].should.be.equal(1);
        });

        it('keep healthy cells alive', function () {
            game.grid[0][1].should.be.equal(1);
            game.grid[1][0].should.be.equal(1);
            game.grid[1][2].should.be.equal(1);
            game.grid[2][1].should.be.equal(1);
        });
    });
});
