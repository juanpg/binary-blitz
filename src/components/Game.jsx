import { useState, useEffect, useRef } from "react";
import Computer from "./Computer";
import Bits from "./Bits";
import Player from "./Player";
import Difficulty from "./Difficulty";
import CurrentStats from "./CurrentStats";

function Game() {
    const [playing, setPlaying] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(0);
    const [goalNumber, setGoalNumber] = useState(0);
    const [playerNumber, setPlayerNumber] = useState(0);
    const [currentBit, setCurrentBit] = useState(null);
    const startButton = useRef(null);
    const submitButton = useRef(null);

    const nextRound = () => {
        setGoalNumber(gl => Math.floor(Math.random() * 255) + 1);
        setPlayerNumber(num => 0);
        setCurrentBit(bt => 0);
        setCurrentLevel(lvl => lvl + 1);
        setPlaying(pl => true);
    }

    const validateAnswer = () => {
        setPlaying(false);

        if(playerNumber === goalNumber) {
            // Increase or reset speed
            setCurrentLevel(lvl => lvl + 1);
        } else {

            alert('You lost');

            // Update overall stats;
        }
    }

    const onPlayerBitChange = (bit) => {
        const mask = 1 << bit;
        setPlayerNumber(num => num ^ mask);
    }

    useEffect(() => {
        let intervalId = null;

        const onTimeout = () => {
            if(currentBit >= 7) {
                // Lost on time out
                setPlaying(false);
                
                alert('You lost');

                // Update overall stats

                return;
            }

            setCurrentBit(bt => bt + 1);
        }

        if(playing) {
            intervalId = setInterval(onTimeout, 2000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [playing, currentBit, currentLevel]);

    useEffect(() => {
        const onKeyDown = (event) => {
            if(event.keyCode === 32) {
                if(playing) {
                    if(submitButton.current) {
                        submitButton.current.click();
                    }
                } else {
                    if(startButton.current) {
                        startButton.current.click();
                    }
                }
            }
        }
    
        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    
    }, [playing]);


    return (
        <div className="game">
            <Computer playing={playing} currentLevel={currentLevel} goalNumber={goalNumber} currentBit={currentBit} />
            <Bits currentBit={currentBit} currentLevel={currentLevel} goalNumber={goalNumber} />
            <Player playing={playing} currentLevel={currentLevel} playerNumber={playerNumber} onBitChange={onPlayerBitChange} />
            <div className='buttons'>
                <button ref={startButton} onClick={nextRound} disabled={playing}>Start</button>
                <Difficulty round={currentLevel} delay={2000} />
                <button ref={submitButton} onClick={validateAnswer} disabled={!playing}>Submit</button>
            </div>
            <CurrentStats rounds={currentLevel} lastRound={0} secondsPerRound={0} />
        </div>
    );
}

export default Game;