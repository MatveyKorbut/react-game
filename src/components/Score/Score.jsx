import React, {useState, useEffect, useRef} from 'react';


const Score = ({score, length, highScore}) =>{
    return (
        <div className={'score-board'}>
            <span>Score: {score}</span>
            <br/>
            <span>Length: {length}</span>
            <br/>
            <span style={{fontSize:11.5}}>highScore: {highScore}</span>
            <br/>
            <br/>
            <br/> <br/>
            <span>move: WASD </span> <br/>
            <span>Exit: X</span> <br/>
            <span>pause: p</span> <br/>
            <span>resume: r</span> <br/>
        </div>
    )
}


export default Score;