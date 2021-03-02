export const FRUITS = ["🍑", "🍎", "🍏", "🍐", "🍓", "🥝"];
export const PEOPLE = ["👶", "👧", "🧒", "👦", "👩", "🧑"];
export const ANIMALS = ["🐶", "🐱", "🐹", "🦊", "🐻", "🐢"];


export const createBordArray = (size) => {
    let board = []
    for (let x = 0; x < size.x; x++) {
        board[x] = [];
        for (let y = 0; y < size.y; y++) {
            board[x].push({x, y});
        }
    }
    return board;
}
export const getRandomBoardPosition = (arr, size) => {

    const food = {
        x: Math.floor((Math.random() * size.x)),
        y: Math.floor((Math.random() * size.y))
    }

    if (arr.find(el => el.x === food.x && el.y === food.y)) {
        return getRandomBoardPosition(arr, size)
    } else {
        return food;
    }
}

export const getCenterOfBoard = (size) => {
    return {
        x: Math.floor((size.x - 1) / 2),
        y: Math.floor((size.y - 1) / 2),
    }
}

export const getFood = (foodType) => {
    let type = FRUITS;
    if (foodType === 'ANIMALS') {
        type = ANIMALS;
    }
    if (foodType === 'PEOPLE') {
        type = PEOPLE;
    }
    return type[Math.floor(Math.random() * FRUITS.length)];

}

export const checkForDuplicates = (array) => {
    let result = false;
    array.forEach(el => {
        const pair = array.filter(cell => JSON.stringify(el) === JSON.stringify(cell));
        if (pair.length > 1) {
            result = true;
        }
    })
    return result;
}

export const allowDirection = (currentDirection, newDirection) => {
    let allow = false;
    if (currentDirection === 'up' || currentDirection === 'down') {
        allow = newDirection === 'left' || newDirection === 'right';
    }
    if (currentDirection === 'left' || currentDirection === 'right') {
        allow = newDirection === 'up' || newDirection === 'down';
    }
    return allow
}