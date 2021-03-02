import React, {useState, useEffect, useRef} from 'react';


const Score = ({score, length}) =>{
    return (
        <div className={'score-board'}>
            <span>Score: {score}</span>
            <br/>
            <span>Length: {length}</span>
        </div>
    )
}


export default Score;