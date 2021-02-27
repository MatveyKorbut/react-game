export const createBordArray = (height, width) => {
    let board = []
    for (let x = 0; x < height; x++) {
        board[x] = [];
        for (let y = 0; y < width; y++) {
            board[x].push({x, y})
        }
    }

    return board;
}
export const getRandomBoardPosition = (x, y) => {
    return {
        x: Math.floor((Math.random() * x)),
        y: Math.floor((Math.random() * y))
    }
}

export const getCenterOfBoard = (x, y) => {

    return {
        x: Math.floor((x - 1) / 2),
        y: Math.floor((y - 1) / 2),
    }
}

export const getFruit = () => {
    const FRUITS = ["🍑", "🍎", "🍏", "🍐", "🍓", "🥝"];
    return FRUITS[Math.floor(Math.random() * FRUITS.length)];
}
