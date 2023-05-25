"use strict";
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
const board = random_state(10, 10);
console.log(board);
render(board);
//# sourceMappingURL=index.js.map