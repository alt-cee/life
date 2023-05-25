function blank_state(width: number, height: number): number[][] {
    const board = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            row.push(0)
        };
        board.push(row)
    };
    return board
};

function cell_state(probability: number): number {
    if (probability <= 0.5) {
        return 0;
    }
    else {
        return 1;
    }
};

function random_state(width: number, height: number): number[][] {
    const board = [];
    for (let i = 0; i < height; i++) {
        const row = [];
        for (let j = 0; j < width; j++) {
            const random_number = Math.random();
            row.push(cell_state(random_number))
        };
        board.push(row)
    };
    return board
};

function render(board: number[][]) {
    function render_symbol(cell: number): string {
        if (cell === 1) {
            return '*';
        }
        else {
            return ' '
        }
    }
    const table = board.map(row => {
        return row.map(cell => {
            return render_symbol(cell)}).join('|')}).join('\n');
    console.log(table) 
}

function next_board_state(board: number[][]): number[][] {
    function next_cell_state(cell: number, neighbors: number[]): number {
        const next_state = 1;
        return next_state;
    }

    const width = board[0].length;
    const height = board.length;
    const next_state = blank_state(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            next_state[i][j] = next_cell_state(board[i][j], [0, 0, 0])
        }
    }

    return next_state;
}

const board = random_state(10, 10);
// console.log(board);
// render(board);
render(next_board_state(board));