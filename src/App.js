import './App.css';
import React, {useState} from 'react';

import Board from './components/Board/Board';
import Score from './components/Score/Score';
import Menu from './components/Menu/Menu';
import Settings from './components/Settings/Settings';
import {getSettings, getStats} from './controllers/utils';
import RSLogo from './assets/rs_school_js.svg'

function App() {


    const [play, setPlay] = useState(false)
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(getStats().highScore || 0);
    const [settings, setSettings] = useState(false);
    const [length, setLength] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    const [food, setFood] = useState(getSettings().food || 'FRUITS');;
    const [difficulty, setDifficulty] = useState(getSettings().difficulty || 200);
    const [headColor, setHeadColor] = useState(getSettings().headColor || 'black');
    const [allowSound, setAllowSound] = useState(getSettings().allowSound || true);
    return (
        <div className="App">
            <div className="tetris">
                { !settings ?
                    (play && !gameOver ?
                        <>
                            <Board
                                score={score}
                                setScore={setScore}
                                setLength={setLength}
                                start={play}
                                setGameOver={setGameOver}
                                foodType={food}
                                difficulty={difficulty}
                                highScore={highScore}
                                setHighScore={setHighScore}
                                headColor={headColor}
                                allowSound={allowSound}

                            />
                            <Score
                                score={score}
                                length={length}
                                highScore={highScore}
                                allowSound={allowSound}

                            />
                        </>

                        :
                        <>
                            <Menu
                                setPlay={setPlay}
                                gameOver={gameOver}
                                setGameOver={setGameOver}
                                setSettings={setSettings}
                            >

                            </Menu>
                        </>
                    )
                    : <Settings
                        food={food}
                        setFood={setFood}
                        setSettings={setSettings}
                        difficulty={difficulty}
                        setDifficulty={setDifficulty}
                        headColor={headColor}
                        setHeadColor={setHeadColor}
                        allowSound={allowSound}
                        setAllowSound={setAllowSound}
                    />
                }
            </div>


            <footer style={{position: 'absolute', bottom: 0, margin: '0 auto', width: '100%'}}>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <img src={RSLogo} width={'150px'}/>
                    <a href="https://github.com/MatveyKorbut">MatveyKorbut</a>
                    2021
                </div>
            </footer>
        </div>
    );
}

export default App;
