import { useState, useEffect, useRef, useCallback } from "react";
import Computer from "./Computer";
import Bits from "./Bits";
import Player from "./Player";
import Difficulty from "./Difficulty";
import CurrentStats from "./CurrentStats";
import Help from "./Help";
import OverallStats from "./OverallStats";
import GameOverDialog from "./GameOverDialog";

function Game() {
    const INITIAL_DELAY = 2000;
    const LEVEL_UP = 20;
    const DELAY_DECREASE = 0.95;
    const [gameOver, setGameOver] = useState(true);
    const [delay, setDelay] = useState(INITIAL_DELAY);
    const [playing, setPlaying] = useState(false);
    // const [currentRound, setCurrentRound] = useState(0);
    const [goalNumber, setGoalNumber] = useState(0);
    const [playerNumber, setPlayerNumber] = useState(0);
    const [currentBit, setCurrentBit] = useState(-1);
    const [roundStartTime, setRoundStartTime] = useState(null);
    // const [totalTime, setTotalTime] = useState(null);
    // const [lastRoundTime, setLastRoundTime] = useState(null);
    const [roundTimes, setRoundTimes] = useState([]);
    const [stats, setStats] = useState(JSON.parse(localStorage.getItem('stats') ?? '{"statistics": {"totalGames": 0, "highestRound": 0, "averageRound": 0}, "distribution": {}, "top10": []}'));

    const startButton = useRef(null);
    const submitButton = useRef(null);
    const gameOverDialog = useRef(null);

    const nextRound = () => {
        if(gameOver) {
            setGameOver(go => false);
            // setCurrentRound(lvl => 1);
            // setTotalTime(ttl => 0);
            // setLastRoundTime(lrt => 0);
            setRoundTimes(rt => []);
        }
        setGoalNumber(gl => {
            while(true) {
                const newGoal = Math.floor(Math.random() * 255) + 1;
                if(newGoal !== gl) {
                    return newGoal;
                }
            }
        });
        setPlayerNumber(num => 0);
        setCurrentBit(bt => 0);
        setPlaying(pl => true);
        setRoundStartTime(t => performance.now());
    }

    const validateAnswer = () => {
        const roundDuration = performance.now() - roundStartTime;

        setPlaying(pl => false);

        if(playerNumber === goalNumber) {
            // setTotalTime(ttl => ttl + roundDuration);
            // setLastRoundTime(lrt => roundDuration);
            // setCurrentRound(lvl => lvl + 1);
            setRoundTimes(rt => rt.concat(roundDuration));
        } else {
            setGameOver(go => true);
            updateOverallStats();
            showGameOverDialog();
        }
    }

    const onPlayerBitChange = (bit) => {
        const mask = 1 << bit;
        setPlayerNumber(num => num ^ mask);
    }

    const showGameOverDialog = useCallback(() => {
        if(gameOverDialog.current) {
            gameOverDialog.current.click();
        }
    }, []);

    const updateOverallStats = useCallback(() => {
        const stats = JSON.parse(localStorage.getItem('stats') ?? '{"statistics": {"totalGames": 0, "highestRound": 0, "averageRound": 0}, "distribution": {}, "top10": []}');

        if(roundTimes.length > stats.statistics.highestRound) {
            stats.statistics.highestRound = roundTimes.length;
        }
        stats.statistics.averageRound = (stats.statistics.totalGames * stats.statistics.averageRound + roundTimes.length) / (stats.statistics.totalGames + 1)
        stats.statistics.totalGames += 1;

        const level = Math.floor(roundTimes.length / LEVEL_UP);
        if(stats.distribution[level]) {
            stats.distribution[level] += 1;
        } else {
            stats.distribution[level] = 1;
        }

        stats.top10 = [...stats.top10]
            .concat({
                "date": new Date(), 
                "rounds": roundTimes.length, 
                "averageTime": (roundTimes.length > 0 ? roundTimes.reduce((t, i) => t + i, 0) / roundTimes.length / 1000 : 0)
            }).sort((a, b) => {
                if(a.rounds !== b.rounds) {
                    return b.rounds - a.rounds;
                }

                return a.averageTime - b.averageTime;
            }).slice(0, 5);

        localStorage.setItem('stats', JSON.stringify(stats));

        setStats(st => stats);
    }, [roundTimes]);

    useEffect(() => {
        let intervalId = null;

        const onTimeout = () => {
            if(currentBit >= 7) {
                // Lost on time out
                setPlaying(pl => false);
                setGameOver(go => true);

                setCurrentBit(bt => bt + 1);

                // Update overall stats
                updateOverallStats();

                clearInterval(intervalId);

                showGameOverDialog();
            } else {
                setCurrentBit(bt => bt + 1);
            }            
        }

        if(playing) {
            intervalId = setInterval(onTimeout, delay);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [playing, currentBit, delay, updateOverallStats, showGameOverDialog]);

    useEffect(() => {
        const onKeyDown = (event) => {
            if(event.keyCode === 32) {
                if(document.activeElement instanceof HTMLButtonElement) {
                    if(!(document.activeElement === submitButton.current || document.activeElement === startButton.current)) {
                        return;
                    }
                }
                if(document.activeElement.classList.contains('modal')) {
                    return;
                }

                // Give the player a chance to actually play
                if(playing && playerNumber === 0) {
                    return;
                }
                
                event.preventDefault();
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
    
    }, [playing, playerNumber]);

    useEffect(() => {
        let newDelay = null;
        // if(roundTimes.length  > 0) {
            if(roundTimes.length <= 120) {
                newDelay = INITIAL_DELAY * (DELAY_DECREASE ** (roundTimes.length % LEVEL_UP));
            } else {
                newDelay = INITIAL_DELAY * (DELAY_DECREASE ** (roundTimes.length - 100));
            }
        // }
        setDelay(dl => newDelay);

    }, [roundTimes]);

    return (
        <main className="game">
            <Computer playing={playing} currentRound={roundTimes.length + 1} goalNumber={goalNumber} currentBit={currentBit} />
            <Bits playing={playing} currentBit={currentBit} currentRound={roundTimes.length + 1} goalNumber={goalNumber} />
            <Player playing={playing} currentRound={roundTimes.length + 1} playerNumber={playerNumber} onBitChange={onPlayerBitChange} />
            <div className='buttons'>
                <button type="button" className="btn btn-primary" ref={startButton} onClick={nextRound} disabled={playing}>Start</button>
                <Difficulty level={Math.floor(roundTimes.length / LEVEL_UP)} delay={delay} />
                <button type="button" className="btn btn-primary" ref={submitButton} onClick={validateAnswer} disabled={!playing}>Submit</button>
            </div>
            <CurrentStats roundTimes={roundTimes} />
            <Help />
            <OverallStats 
                stats={stats} 
                resetStats={() => {
                    const newStats = {"statistics": {"totalGames": 0, "highestRound": 0, "averageRound": 0}, "distribution": {}, "top10": []};
                    localStorage.setItem('stats', JSON.stringify(newStats));
                    setStats(st => newStats);
                } 
             } />
             <GameOverDialog dialogRef={gameOverDialog} />
        </main>
           
    );
}

export default Game;