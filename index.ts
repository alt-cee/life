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

console.log(random_state(3, 3));
console.log(cell_state(0.6));