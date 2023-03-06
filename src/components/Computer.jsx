import { useEffect, useState } from "react";
import InfoBit from "./InfoBit";

function Computer({playing, currentLevel, goalNumber, currentBit}) {
    const [number, setNumber] = useState('00000000');

    useEffect(() => {
        if(playing) {
            setNumber(nm => {
                const newNumber = goalNumber.toString(2).padStart(8, '0').substring(0, currentBit + 1).padEnd(8, '0');
                return newNumber;
            });
        }
    }, [playing, currentBit, goalNumber, number]);

    return (
        <div className="number computer">
            {number.split('').map((bitValue, index) => <InfoBit key={index} bitValue={bitValue} playing={playing} currentLevel={currentLevel} />)}
            <div className="bit result">{parseInt(number, 2)}</div>
        </div>
    );
}

export default Computer;