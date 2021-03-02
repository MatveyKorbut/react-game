import './App.css';
import React, {useState} from 'react';

import Board from './components/Board/Board';
import Score from './components/Score/Score';
import Menu from './components/Menu/Menu';
import Settings from './components/Settings/Settings';

function App() {
    const [play, setPlay] = useState(false)
    const [score, setScore] = useState(0);
    const [settings, setSettings] = useState(false);
    const [length, setLength] = useState(1);
    const [gameOver, setGameOver] = useState(false);

    const [food, setFood] = useState('FRUITS');

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
                            />
                            <Score
                                score={score}
                                length={length}
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
                    />
                }
            </div>
        </div>
    );
}

export default App;
