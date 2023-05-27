"use strict";
class Board {
    // constructor
    constructor(elements) {
        this.elements = elements;
    }
    // methods
    // get board width
    getwidth() {
        return this.elements[0].length;
    }
    // get board height
    getheight() {
        return this.elements.length;
    }
    // get board elements
    getelements() {
        return this.elements;
    }
    // find cell neighbors
    find_neighbors(i, j) {
        const neighbors = [];
        for (let y = i - 1; y <= i + 1; y++) {
            for (let x = j - 1; x <= j + 1; x++) {
                if (x === j && y === i) {
                    continue;
                }
                else if (x < 0 || y < 0 || x >= this.getwidth() || y >= this.getheight()) {
                    neighbors.push(0);
                }
                else {
                    neighbors.push(this.getelements()[y][x]);
                }
            }
        }
        return neighbors;
    }
}
function blank_state(width, height) {
    const board = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(0);
        }
        ;
        board.push(row);
    }
    ;
    return board;
}
;
function cell_state(probability) {
    if (probability <= 0.5) {
        return 0;
    }
    else {
        return 1;
    }
}
;
function random_state(width, height) {
    const board = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const random_number = Math.random();
            row.push(cell_state(random_number));
        }
        ;
        board.push(row);
    }
    ;
    return board;
}
;
function render(board) {
    function render_symbol(cell) {
        if (cell === 1) {
            return '*';
        }
        else {
            return ' ';
        }
    }
    const table = board.getelements().map(row => {
        return row.map(cell => {
            return render_symbol(cell);
        }).join('|');
    }).join('\n');
    console.log(table);
}
function next_board_state(board) {
    function next_cell_state(cell, neighbors) {
        const alive_neighbors = neighbors.reduce((total, v) => total + v);
        let next_state = 0;
        if (cell === 1) {
            if (alive_neighbors <= 1) {
                next_state = 0;
            }
            else if (alive_neighbors <= 3) {
                next_state = 1;
            }
            else {
                next_state = 0;
            }
        }
        else {
            if (alive_neighbors === 3) {
                next_state = 1;
            }
            else {
                next_state = 0;
            }
        }
        return next_state;
    }
    const width = board.getwidth();
    const height = board.getheight();
    const next_state = blank_state(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const neighbors = board.find_neighbors(i, j);
            // (i-1, j-1), (i-1, j), (i+1, j+1)
            // (i, j-1), (i, j), (i, j+1)
            // (i+1, j-1), (i+1, j), (i+1, j+1)
            const cell = board.getelements()[i][j];
            next_state[i][j] = next_cell_state(cell, neighbors);
        }
    }
    return new Board(next_state);
}
const toad = new Board([
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]);
function main() {
    // let current_state = random_state(10, 10);
    let current_state = toad;
    let iteration = 0;
    while (iteration < 2) {
        render(current_state);
        current_state = next_board_state(current_state);
        iteration++;
    }
}
main();
//# sourceMappingURL=index.js.map