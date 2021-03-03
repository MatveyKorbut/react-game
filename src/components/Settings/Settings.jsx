import React, {useEffect} from 'react';

import {FRUITS, ANIMALS, PEOPLE} from '../../controllers/utils';
import './style.css';

const Settings = ({food, setFood, setSettings, difficulty, setDifficulty, headColor, setHeadColor, allowSound, setAllowSound}) => {

    useEffect(() =>{
        return ()=>{
            const settings = {
                food, difficulty, headColor, allowSound
            }
            window.localStorage.setItem('settings', JSON.stringify(settings))
        }
    }, [food, difficulty, headColor, allowSound])

    return (
        <div className={'menu'}>
            <span>Settings</span>

            <span>Food:</span>
            <ul>
                <li>
                    <label htmlFor="food1">
                        <input id="food1" type="radio" name="food" value="FRUITS" checked={food==='FRUITS'}
                            onChange={()=>{
                                setFood('FRUITS')
                            }}
                        />
                        {FRUITS.join()}
                    </label>
                </li>
                <li>
                    <label htmlFor="food2">
                        <input id="food2" type="radio" name="food" value="ANIMALS" checked={food==='ANIMALS'}
                               onChange={()=>{
                                   setFood('ANIMALS')

                               }}
                        />
                        {ANIMALS.join()}

                    </label>
                </li>
                <li>
                    <label htmlFor="food3">
                        <input id="food3" type="radio" name="food" value="PEOPLE" checked={food==='PEOPLE'}
                               onChange={()=>{
                                   setFood('PEOPLE')

                               }}
                        />
                        {PEOPLE.join()}

                    </label>
                </li>
            </ul>

            <span>Difficulty:</span>
            <ul>
                <li>
                    <label htmlFor="diff1">
                        <input id="diff1" type="radio" name="difficulty" value="200" checked={200=== difficulty}
                               onChange={()=>{
                                   setDifficulty(200)

                               }}
                        />
                        1
                    </label>
                </li>
                <li>
                    <label htmlFor="diff2">
                        <input id="diff2" type="radio" name="difficulty" value="150" checked={150===difficulty}
                               onChange={()=>{
                                   setDifficulty(150)

                               }}
                        />
                        2

                    </label>
                </li>
                <li>
                    <label htmlFor="diff3">
                        <input id="diff3" type="radio" name="difficulty" value="100" checked={100===difficulty}
                               onChange={()=>{
                                   setDifficulty(100)
                               }}
                        />
                        3
                    </label>
                </li>
            </ul>
            <span>Head Color:</span>
            <ul>
                <li>
                    <label htmlFor="head1" style={{color: 'red'}}>
                        <input id="head1" type="radio" name="color" value="200" checked={'red'===headColor}
                               onChange={()=>{
                                   setHeadColor('red')
                               }}
                        />
                        Red
                    </label>
                </li>
                <li>
                    <label htmlFor="head2"  style={{color: 'green'}}>
                        <input id="head2" type="radio" name="color" value="150" checked={'green'===headColor}
                               onChange={()=>{
                                    setHeadColor('green')
                               }}
                        />
                        Green

                    </label>
                </li>
                <li>
                    <label htmlFor="head3"  style={{color: 'black'}}>
                        <input id="head3" type="radio" name="color" value="100" checked={'black'===headColor}
                               onChange={()=>{
                                  setHeadColor('black')
                               }}
                        />
                        Black
                    </label>
                </li>
            </ul>
            <span>sound:</span>
            <ul>
                <li>
                    <label htmlFor="sound1">
                        <input id="sound1" type="radio" name="sound" value="200" checked={allowSound}
                               onChange={()=>{
                                   setAllowSound(true)
                               }}
                        />
                        On
                    </label>
                </li>
                <li>
                    <label htmlFor="sound2">
                        <input id="sound2" type="radio" name="sound" value="150" checked={!allowSound}
                               onChange={()=>{
                                   setAllowSound(false)
                               }}
                        />
                        Off

                    </label>
                </li>

            </ul>
            <div
                style={{margin: '10px 0', cursor: 'pointer'}}
                className={'menu-item'}

                onClick={()=>{
                    setSettings(false);
                }}
            >
                Back
            </div>
        </div>
    )
}


export default Settings;