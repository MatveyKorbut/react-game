import './App.css';
import React, {useState} from 'react';

import Board from './components/Board/Board';
import Score from './components/Score/Score';

function App() {
    const [play, setPlay] = useState(false)
    const [score, setScore] = useState(0);
    const [length, setLength] = useState(1);
    return (
        <div className="App">
            <div className="tetris">

                {
                    play ?
                        <>
                        <Board
                            score={score}
                            setScore={setScore}
                            setLength={setLength}

                        />
                        <Score
                            score={score}
                            length={length}
                        />
                        </>
                    :
                    <>
                    </>
                }
            </div>
        </div>
    );
}

export default App;
