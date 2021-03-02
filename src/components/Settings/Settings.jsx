import React, {useState, useEffect, useRef} from 'react';

import {FRUITS, ANIMALS, PEOPLE} from '../../controllers/utils';
import './style.css';
import black from '../../assets/black.png'

const Settings = ({food, setFood, setSettings}) => {


    return (
        <div className={'menu'}>
            <span>Settings</span>

            <span>Food:</span>
            <ul>
                <li>
                    <label htmlFor="muhRadio1">
                        <input type="radio" name="food" value="FRUITS" checked={food==='FRUITS'}
                            onChange={()=>{
                                setFood('FRUITS')
                            }}
                        />
                        {FRUITS.join()}
                    </label>
                </li>
                <li>
                    <label htmlFor="muhRadio2">
                        <input type="radio" name="food" value="ANIMALS" checked={food==='ANIMALS'}
                               onChange={()=>{
                                   setFood('ANIMALS')

                               }}
                        />
                        {ANIMALS.join()}

                    </label>
                </li>
                <li>
                    <label htmlFor="muhRadio3">
                        <input type="radio" name="food" value="PEOPLE" checked={food==='PEOPLE'}
                               onChange={()=>{
                                   setFood('PEOPLE')

                               }}
                        />
                        {PEOPLE.join()}

                    </label>
                </li>
            </ul>
            <div
                style={{margin: '10px 0', cursor: 'pointer'}}
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