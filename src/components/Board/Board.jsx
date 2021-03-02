import React, {useState, useEffect, useRef} from 'react';
import './style.css';
import {
    allowDirection,
    checkForDuplicates,
    createBordArray, getCenterOfBoard, getFruit, getRandomBoardPosition,
} from '../../controllers/utils';


const Board = ({score, setScore, setLength}) => {

    const boardSize = {x:10, y: 20};
    const [board, setBoard] = useState(createBordArray(boardSize));
    const [snake, setSnake] = useState([{...getCenterOfBoard(boardSize), isHead: true}]);
    const [snakeDirection, setSnakeDirection] = useState('');

    const [moveDirection, setMoveDirection] = useState('');
    const [play, setPlay] = useState(false);

    const [food, setFood] = useState({
        ...getRandomBoardPosition(snake, boardSize), picture: getFruit()
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
            console.log("GAME OVER");
            setPlay(false);
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
            setScore(score+1);
            setFood({
                ...getRandomBoardPosition(snake, boardSize), picture: getFruit()
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
            switch (keyCode) {
                case 87: {
                    setSnakeDirection('up');
                    break;
                }
                case 83: {
                    setSnakeDirection('down');
                    break;
                }
                case 65: {
                    setSnakeDirection('left');
                    break;
                }
                case 68: {
                    setSnakeDirection('right');
                    break;
                }
                default:
                    break;
            }


        }
    }

    useEffect(() => {
        createSnake();
        document.addEventListener('keydown', changeSnakeDirection, false);
        return () => document.removeEventListener('keydown', changeSnakeDirection, false);
    }, [])

    useMoveSnake(moveSnake, 200)

    return (
        <div>
            <button onClick={() => {
                setPlay(!play);
            }}>
                play
            </button>
            <div className={"board"}>
                {
                    board.map((row, idx) =>
                        <div key={idx}>
                            {row.map((cell, cdx) => (
                                    <div
                                        key={idx + cdx}
                                        className={`board-item ${cell.isSnake ? 'snake' : ""} ${cell.isHead ? 'snake-head' : ""}`}
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