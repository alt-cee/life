"use strict";
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
    const table = board.map(row => {
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
    function find_neighbors(i, j, board) {
        const width = board[0].length;
        const height = board.length;
        const neighbors = [];
        for (let y = i - 1; y <= i + 1; y++) {
            for (let x = j - 1; x <= j + 1; x++) {
                if (x === j && y === i) {
                    continue;
                }
                else if (x < 0 || y < 0 || x >= width || y >= height) {
                    neighbors.push(0);
                }
                else {
                    neighbors.push(board[y][x]);
                }
            }
        }
        return neighbors;
    }
    const width = board[0].length;
    const height = board.length;
    const next_state = blank_state(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const neighbors = find_neighbors(i, j, board);
            // (i-1, j-1), (i-1, j), (i+1, j+1)
            // (i, j-1), (i, j), (i, j+1)
            // (i+1, j-1), (i+1, j), (i+1, j+1)
            const cell = board[i][j];
            next_state[i][j] = next_cell_state(cell, neighbors);
        }
    }
    return next_state;
}
const toad = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];
function main() {
    // let current_state = random_state(10, 10);
    let current_state = toad;
    let iteration = 0;
    while (iteration < 1000) {
        render(current_state);
        current_state = next_board_state(current_state);
        iteration++;
    }
}
main();
//# sourceMappingURL=index.js.map