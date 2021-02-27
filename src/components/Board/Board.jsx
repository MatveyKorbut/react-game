import React, {useState, useEffect, useRef} from 'react';
import './style.css';
import {
    createBordArray,
} from '../../controllers/utils';


const Board = () => {
    const boardHeight = 10;
    const boardWidth = 10;

    const [board, setBoard] = useState(createBordArray(boardHeight, boardWidth))


    return (
        <>
            <div className={"board"}>
                {
                    board.map((row, idx) =>
                        <div key={idx}>
                            {row.map((cell, cdx) => (
                                    <div
                                        key={idx + cdx}
                                        className='board-item'
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