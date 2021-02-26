import React, {useState} from 'react';
import './style.css';

const Board = () => {
    const boardRows = 10;
    const boardCols = 10;

    const initialBoard = [];

    for (let row = 0; row < boardRows; row++) {
        for (let col = 0; col < boardCols; col++) {
            initialBoard.push({
                row,
                col
            });
        }
    }


    const [board, setBoard] = useState(initialBoard);

    const displayBoard = board.map((item) => {
        return (
            <div
                key={item.row.toString() + '-' + item.col.toString()}
                className={"board-item"}>
            </div>
        )
    })

    return (
        <div className={"board"}>
            {displayBoard}
        </div>
    )
}

export default Board;