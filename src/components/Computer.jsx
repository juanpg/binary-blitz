import { useEffect, useState } from "react";
import InfoBit from "./InfoBit";

function Computer({playing, currentRound, goalNumber, currentBit}) {
    const level = Math.floor((currentRound - 1) / 20);
    const displaySum = level < 3 || !playing;
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
            {number.split('').map((bitValue, index) => <InfoBit key={index} bitValue={bitValue} playing={playing} currentRound={currentRound} className="bg-danger text-bg-danger" />)}
            <div className="bit result rounded-4 bg-danger text-bg-danger">{displaySum ? parseInt(number, 2) : ''}</div>
        </div>
    );
}

export default Computer;