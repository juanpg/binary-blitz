import { useState, useEffect, useRef, useCallback } from "react";
import Computer from "./Computer";
import Bits from "./Bits";
import Player from "./Player";
import Difficulty from "./Difficulty";
import CurrentStats from "./CurrentStats";

function Game() {
    const INITIAL_DELAY = 2000;
    const LEVEL_UP = 20;
    const DELAY_DECREASE = 0.95;
    const [gameOver, setGameOver] = useState(true);
    const [delay, setDelay] = useState(null);
    const [playing, setPlaying] = useState(null);
    const [currentRound, setCurrentRound] = useState(0);
    const [goalNumber, setGoalNumber] = useState(0);
    const [playerNumber, setPlayerNumber] = useState(0);
    const [currentBit, setCurrentBit] = useState(null);
    const [roundStartTime, setRoundStartTime] = useState(null);
    const [totalTime, setTotalTime] = useState(null);
    const [lastRoundTime, setLastRoundTime] = useState(null);

    const startButton = useRef(null);
    const submitButton = useRef(null);

    const nextRound = () => {
        if(gameOver) {
            setGameOver(go => false);
            setCurrentRound(lvl => 1);
            setTotalTime(ttl => 0);
            setLastRoundTime(lrt => 0);
        }
        setGoalNumber(gl => Math.floor(Math.random() * 255) + 1);
        setPlayerNumber(num => 0);
        setCurrentBit(bt => 0);
        // setCurrentRound(lvl => lvl + 1);
        setPlaying(pl => true);
        setRoundStartTime(t => performance.now());
    }

    const validateAnswer = () => {
        const roundDuration = performance.now() - roundStartTime;

        setPlaying(false);

        if(playerNumber === goalNumber) {
            setTotalTime(ttl => ttl + roundDuration);
            setLastRoundTime(lrt => roundDuration);
            setCurrentRound(lvl => lvl + 1);
            // Calculate round time
            // Increase or reset speed
            // setCurrentRound(lvl => lvl + 1);
        } else {

            setGameOver(go => true);
            alert('You lost');

            updateOverallStats();

            // Update overall stats;
        }
    }

    const onPlayerBitChange = (bit) => {
        const mask = 1 << bit;
        setPlayerNumber(num => num ^ mask);
    }

    const updateOverallStats = useCallback(() => {
        const stats = JSON.parse(localStorage.getItem('stats') ?? '{"statistics": {"totalGames": 0, "highestRound": 0, "averageRound": 0}, "distribution": {}, "top10": []}');

        if(currentRound-1 > stats.statistics.highestRound) {
            stats.statistics.highestRound = currentRound-1;
        }
        stats.statistics.averageRound = (stats.statistics.totalGames * stats.statistics.averageRound + currentRound - 1) / (stats.statistics.totalGames + 1)
        stats.statistics.totalGames += 1;

        const level = Math.floor((currentRound - 1) / 20);
        if(stats.distribution[level]) {
            stats.distribution[level] += 1;
        } else {
            stats.distribution[level] = 1;
        }

        stats.top10 = [...stats.top10]
            .concat({
                "date": new Date(), 
                "rounds": currentRound, 
                "averageTime": (currentRound > 0 ? totalTime / currentRound / 1000 : 0)
            }).sort((a, b) => {
                if(a.rounds !== b.rounds) {
                    return b.rounds - a.rounds;
                }

                return a.averageTime - b.averageTime;
            }).slice(0, 10);

        localStorage.setItem('stats', JSON.stringify(stats));
    }, [currentRound, totalTime]);

    useEffect(() => {
        let intervalId = null;

        const onTimeout = () => {
            if(currentBit >= 7) {
                // Lost on time out
                setPlaying(pl => false);
                setGameOver(go => true);

                alert('You lost');

                // Update overall stats
                updateOverallStats();

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
    }, [playing, currentBit, currentRound, delay, updateOverallStats]);

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
        <main className="game">
            <Computer playing={playing} currentRound={currentRound} goalNumber={goalNumber} currentBit={currentBit} />
            <Bits currentBit={currentBit} currentRound={currentRound} goalNumber={goalNumber} />
            <Player playing={playing} currentRound={currentRound} playerNumber={playerNumber} onBitChange={onPlayerBitChange} />
            <div className='buttons'>
                <button type="button" className="btn btn-primary" ref={startButton} onClick={nextRound} disabled={playing}>Start</button>
                <Difficulty level={currentRound === undefined ? 0 : Math.floor((currentRound - 1) / 20)} delay={delay} />
                <button type="button" className="btn btn-primary" ref={submitButton} onClick={validateAnswer} disabled={!playing}>Submit</button>
            </div>
            <CurrentStats rounds={Math.max(0, currentRound-1)} lastRound={lastRoundTime / 1000} secondsPerRound={currentRound > 0 ? totalTime / currentRound / 1000 : 0} />
        </main>        
    );
}

export default Game;