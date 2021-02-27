import React, {useState, useEffect, useRef} from 'react';
import './style.css';
import {
    createBordArray, getCenterOfBoard,
} from '../../controllers/utils';


const Board = () => {
    const boardSize = 10;
    const [board, setBoard] = useState(createBordArray(boardSize));
    const [snake, setSnake] = useState([getCenterOfBoard(boardSize)]);
    const [snakeDirection, setSnakeDirection] = useState('up');
    const [play, setPlay] = useState(false)


    const createSnake = () => {
        const newBoard = JSON.parse(JSON.stringify(board));
        newBoard.forEach(x => {
            x.forEach(y => {
                y.isSnake = false;
            })
        });
        snake.forEach(element => {
            newBoard[element.x][element.y].isSnake = true;
        })
        setBoard(newBoard);
    }

    const moveSnake = () => {
        const newSnake = [];
        switch (snakeDirection) {
            case 'up': {
                newSnake.push({x: snake[0].x, y: (snake[0].y - 1 + boardSize)%boardSize});
                break;
            }
            case 'right': {
                newSnake.push({x: (snake[0].x + 1)%boardSize, y: snake[0].y});
                break;
            }
            case 'left': {
                newSnake.push({x: (snake[0].x - 1 + boardSize)%boardSize, y: snake[0].y});
                break;
            }
            case 'down': {
                newSnake.push({x: snake[0].x, y: (snake[0].y + 1)%boardSize})
                break;
            }
            default:
                break;
        }

        setSnake(newSnake);
        createSnake();
    }

    function useMoveSnake(callback, interval) {
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
            }
        }
    }

    useEffect(()=>{
        document.addEventListener('keydown', changeSnakeDirection, false);
        return () => document.removeEventListener('keydown', changeSnakeDirection, false);
    }, [])



    useMoveSnake(moveSnake, 500)

    return (
        <>
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
                                        className={`board-item ${cell.isSnake ? 'snake' : ""}`}
                                    />
                                )
                            )
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Board;