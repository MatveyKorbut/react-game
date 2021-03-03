import React, {useState, useEffect, useRef} from 'react';
import './style.css';
import {
    checkForDuplicates,
    createBordArray, getCenterOfBoard, getFood, getRandomBoardPosition, getStats,
} from '../../controllers/utils';


import eatSound from '../../assets/sounds/SFX_Jump_12.wav';
import loseSound from '../../assets/sounds/lose.wav';


const Board = ({
                   score,
                   setScore,
                   setLength,
                   start,
                   setGameOver,
                   foodType,
                   difficulty,
                   highScore,
                   setHighScore,
                   headColor,
                   allowSound
               }) => {

    const boardSize = {x: 10, y: 20};
    const [board, setBoard] = useState(getStats().board || createBordArray(boardSize));
    const [snake, setSnake] = useState(getStats().snake || [{...getCenterOfBoard(boardSize), isHead: true}]);
    const [snakeDirection, setSnakeDirection] = useState(getStats().snakeDirection || '');


    const savedScore = getStats().score || 0;
    if (savedScore) {
        setScore(savedScore);
    }

    const [play, setPlay] = useState(start);


    const [food, setFood] = useState({
        ...getRandomBoardPosition(snake, boardSize), picture: getFood(foodType)
    })

    const createSnake = () => {
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard.forEach(x => {
            x.forEach(y => {
                y.isSnake = false;
                y.isFood = false;
                y.foodPicture = null;
                y.isHead = false;
            })
        });
        snake.forEach((element, idx) => {
            newBoard[element.x][element.y].isSnake = true;
            if (idx === 0) {
                newBoard[element.x][element.y].isHead = true;
            }
        })


        newBoard[food.x][food.y].isFood = true;
        newBoard[food.x][food.y].foodPicture = food.picture;

        setBoard(newBoard);


        if (checkForDuplicates(snake)) {
            window.localStorage.setItem('stats', JSON.stringify({}));
            setPlay(false);
            setGameOver(true);
            playSound(false);
        }

    }

    const moveSnake = () => {
        const newSnake = [];
        switch (snakeDirection) {
            case 'up': {
                newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + boardSize.y) % boardSize.y});
                break;
            }
            default:
            case 'right': {
                newSnake.push({x: (snake[0].x + 1) % boardSize.x, y: snake[0].y});
                break;
            }
            case 'left': {
                newSnake.push({x: (snake[0].x - 1 + boardSize.x) % boardSize.x, y: snake[0].y});
                break;
            }
            case 'down': {
                newSnake.push({x: snake[0].x, y: (snake[0].y + 1) % boardSize.y})
                break;
            }
        }

        snake.forEach(cell => {
            newSnake.push(cell);
        })

        if (snake[0].x === food.x && snake[0].y === food.y) { //eat
            setScore(Math.round(newSnake.length * 0.4 + newSnake.length));
            if (score >= highScore) {
                setHighScore(Math.round(newSnake.length * 0.4 + newSnake.length));
            }
            playSound(true);
            setFood({
                ...getRandomBoardPosition(snake, boardSize), picture: getFood(foodType)
            })


        } else {
            newSnake.pop();
        }

        setLength(newSnake.length)
        setSnake(newSnake);
        createSnake();
    }

    const useMoveSnake = (callback, interval) => {
        const savedCallback = useRef();
        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);
        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            if (interval !== null && play) {
                let id = setInterval(tick, interval);
                return () => clearInterval(id);
            }
        }, [interval, play]);
    }


    const changeSnakeDirection = (e) => {
        const {keyCode} = e;
        if (keyCode) {
            console.log('', keyCode);
            switch (keyCode) {
                case 87: {
                    if (snakeDirection !== 'down') {
                        setSnakeDirection('up');
                        break;
                    }
                    break;
                }
                case 83: {
                    if (snakeDirection !== 'up') {
                        setSnakeDirection('down');
                        break;
                    }
                    break;
                }
                case 65: {
                    if (snakeDirection !== 'right') {

                        setSnakeDirection('left');
                        break;
                    }
                    break;

                }
                case 68: {
                    if (snakeDirection !== 'left') {
                        setSnakeDirection('right');
                        break;
                    }
                    break;
                }
                default:
                    break;

                case 88: {
                    onbeforeunloadFn();
                    setGameOver(true);
                    setPlay(false);
                    break;
                }
                case 80: {
                    setPlay(false);
                    break;
                }
                case 82: {
                    setPlay(true);
                    break;
                }
            }
        }

    }


    const playSound = (bool) => {
        if (allowSound) {
            const audio = new Audio(bool ? eatSound : loseSound);
            audio.play();
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', changeSnakeDirection, false);
        return () => document.removeEventListener('keydown', changeSnakeDirection, false);
    }, [snakeDirection])


    useEffect(() => {
        createSnake();
        return () => {
            setScore(0);
        }
    }, [])

    const onbeforeunloadFn = () => {
        const stats = {
            score,
            highScore,
            board,
            snake,
            snakeDirection
        }
        window.localStorage.setItem('stats', JSON.stringify(stats));
    }

    useEffect(() => {
        window.addEventListener('beforeunload', onbeforeunloadFn);
        return () => {
            window.removeEventListener('beforeunload', onbeforeunloadFn);
        }
    }, [score, highScore, board, snake])


    useMoveSnake(moveSnake, difficulty)

    const headClass = headColor === 'black' ? 'head-black' : (headColor === 'red' ? 'head-red' : 'head-green')

    return (
        <div>
            <div className={"board"}>
                {
                    board.map((row, idx) =>
                        <div key={idx}>
                            {row.map((cell, cdx) => (
                                    <div
                                        key={idx + cdx}
                                        className={`board-item ${cell.isSnake ? 'snake' : ""} ${cell.isHead ? headClass : ""}`}
                                    >
                                        {cell.isFood ? cell.foodPicture || "" : ""}

                                    </div>
                                )
                            )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Board;