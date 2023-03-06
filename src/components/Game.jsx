import { useState, useEffect, useRef } from "react";
import Computer from "./Computer";
import Bits from "./Bits";
import Player from "./Player";
import Difficulty from "./Difficulty";
import CurrentStats from "./CurrentStats";

function Game() {
    const INITIAL_DELAY = 2000;
    const LEVEL_UP = 20;
    const DELAY_DECREASE = 0.95;
    const [gameOver, setGameOver] = useState(null);
    const [delay, setDelay] = useState(null);
    const [playing, setPlaying] = useState(null);
    const [currentRound, setCurrentRound] = useState(0);
    const [goalNumber, setGoalNumber] = useState(0);
    const [playerNumber, setPlayerNumber] = useState(0);
    const [currentBit, setCurrentBit] = useState(null);
    const startButton = useRef(null);
    const submitButton = useRef(null);

    const nextRound = () => {
        if(gameOver) {
            setGameOver(go => false);
            setCurrentRound(lvl => 1);
        } else {
            setCurrentRound(lvl => lvl + 1);
        }
        setGoalNumber(gl => Math.floor(Math.random() * 255) + 1);
        setPlayerNumber(num => 0);
        setCurrentBit(bt => 0);
        // setCurrentRound(lvl => lvl + 1);
        setPlaying(pl => true);
    }

    const validateAnswer = () => {
        setPlaying(false);

        if(playerNumber === goalNumber) {
            // Calculate round time
            // Increase or reset speed
            // setCurrentRound(lvl => lvl + 1);
        } else {

            alert('You lost');
            setGameOver(go => true);

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
                setPlaying(pl => false);
                setGameOver(go => true);
                alert('You lost');

                // Update overall stats

                return;
            }

            setCurrentBit(bt => bt + 1);
        }

        if(playing) {
            intervalId = setInterval(onTimeout, delay);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [playing, currentBit, currentRound, delay]);

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

    useEffect(() => {
        let newDelay = null;
        if(currentRound > 0) {
            if(currentRound <= 120) {
                newDelay = INITIAL_DELAY * (DELAY_DECREASE ** ((currentRound - 1) % LEVEL_UP));
            } else {
                newDelay = INITIAL_DELAY * (DELAY_DECREASE ** (currentRound - 101));
            }
        }
        setDelay(dl => newDelay);

    }, [currentRound]);


    return (
        <div className="game">
            <Computer playing={playing} currentRound={currentRound} goalNumber={goalNumber} currentBit={currentBit} />
            <Bits currentBit={currentBit} currentRound={currentRound} goalNumber={goalNumber} />
            <Player playing={playing} currentRound={currentRound} playerNumber={playerNumber} onBitChange={onPlayerBitChange} />
            <div className='buttons'>
                <button ref={startButton} onClick={nextRound} disabled={playing}>Start</button>
                <Difficulty level={currentRound === undefined ? 0 : Math.floor((currentRound - 1) / 20)} delay={delay} />
                <button ref={submitButton} onClick={validateAnswer} disabled={!playing}>Submit</button>
            </div>
            <CurrentStats rounds={currentRound} lastRound={0} secondsPerRound={0} />
        </div>
    );
}

export default Game;