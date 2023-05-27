class Board {
    // properties
    private elements: number[][]

    // constructor
    constructor(elements: number[][]) {
        this.elements = elements;
    }
    // methods
    // get board width
    public getwidth(): number {
        return this.elements[0].length
    }
    // get board height
    public getheight(): number {
        return this.elements.length
    }
    // get board elements
    public getelements(): number[][] {
        return this.elements
    }
}

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

function render(board: Board) {
    function render_symbol(cell: number): string {
        if (cell === 1) {
            return '*';
        }
        else {
            return ' '
        }
    }

    const table = board.getelements().map(row => {
        return row.map(cell => {
            return render_symbol(cell)}).join('|')}).join('\n');
    console.log(table)
}

function next_board_state(board: Board): Board {
    function next_cell_state(cell: number, neighbors: number[]): number {
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
    function find_neighbors(i:number, j:number, board: Board): number[] {
        const width = board.getwidth();
        const height = board.getheight();
        const neighbors = [];
        for (let y = i-1; y <= i+1; y++) {
            for (let x = j-1; x<= j+1; x++) {
                if (x === j && y === i) {
                    continue;
                }
                else if (x < 0 || y < 0 || x >= width || y >= height ) {
                    neighbors.push(0);
                }
                else {
                    neighbors.push(board.getelements()[y][x])
                }
            }
        }
        return neighbors;
    }

    const width = board.getwidth();
    const height = board.getheight();
    const next_state = blank_state(width, height);
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const neighbors = find_neighbors(i, j, board);
            // (i-1, j-1), (i-1, j), (i+1, j+1)
            // (i, j-1), (i, j), (i, j+1)
            // (i+1, j-1), (i+1, j), (i+1, j+1)
            const cell = board.getelements()[i][j];
            next_state[i][j] = next_cell_state(cell, neighbors)
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

// const b = new Board([[0, 0, 0], [1, 1, 1]]);
// console.log(b.getwidth())
// console.log(b.getheight())
// console.log(b.getelements())