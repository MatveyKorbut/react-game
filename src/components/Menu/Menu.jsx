import React, {useState, useEffect, useRef} from 'react';

import snakeImage from '../../assets/snake.png'

const Menu = ({setPlay, gameOver, setGameOver, setSettings}) => {


    return (
        <div className={'menu'}>
            <div>
                <div>
                    <img src={snakeImage}/>
                </div>
                Snake Game
            </div>


            {
                gameOver ?
                    <>
                        <div
                            style={{margin: '10px 0', fontSize: '24px'}}
                        >
                            Game Over
                        </div>
                    </>
                    : <></>
            }
            <div
                style={{cursor: 'pointer', marginTop: '10px'}}
                onClick={() => {
                    setPlay(true);
                    setGameOver(false);
                }}
            >
                Start
            </div>
            <div
                style={{cursor: 'pointer', marginTop: '10px'}}
                onClick={() => {
                    setSettings(true);
                }}
            >
                Settings
            </div>
        </div>
    )
}


export default Menu;