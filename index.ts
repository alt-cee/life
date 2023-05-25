function dead_state(width: number, height: number): number[][] {
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

console.log(dead_state(3, 3));