export const createBordArray = (size) => {
    let board = []
    for (let x = 0; x < size; x++) {
        board[x] = [];
        for (let y = 0; y < size; y++) {
            board[x].push({x, y});
        }
    }
    return board;
}
export const getRandomBoardPosition = (size) => {
    return {
        x: Math.floor((Math.random() * size)),
        y: Math.floor((Math.random() * size))
    }
}

export const getCenterOfBoard = (size) => {
    return {
        x: Math.floor((size - 1) / 2),
        y: Math.floor((size - 1) / 2),
    }
}

export const getFruit = () => {
    const FRUITS = ["🍑", "🍎", "🍏", "🍐", "🍓", "🥝"];
    return FRUITS[Math.floor(Math.random() * FRUITS.length)];
}
