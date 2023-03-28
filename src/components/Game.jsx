import { useState, useEffect, useRef, useContext } from "react";
import { VStack, Button, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { AppContext } from "../context/appContext";
import PlayerComputer from "./PlayerComputer";
import Bits from "./Bits";
import PlayerHuman from "./PlayerHuman";
import Difficulty from "./Difficulty";
import CurrentStats from "./CurrentStats";
import GameOverDialog from "./GameOverDialog";

function Game() {
    const INITIAL_DELAY = 2000;
    const LEVEL_UP = 20;
    const DELAY_DECREASE = 0.95;
    const [gameOver, setGameOver] = useState(true);
    const [delay, setDelay] = useState(INITIAL_DELAY);
    const [playing, setPlaying] = useState(false);
    const [goalNumber, setGoalNumber] = useState(0);
    const [playerNumber, setPlayerNumber] = useState(0);
    const [currentBit, setCurrentBit] = useState(-1);
    const [roundStartTime, setRoundStartTime] = useState(null);
    const [roundTimes, setRoundTimes] = useState([]);

    const { keyboardMap, updateStats, isHelpOpen, isStatsOpen, isLeaderboardOpen, isSettingsOpen } = useContext(AppContext);

    const startButton = useRef(null);
    const submitButton = useRef(null);

    const { isOpen: isGameOverOpen, onOpen: onGameOverOpen, onClose: onGameOverClose } = useDisclosure();

    const dialogOpen = isHelpOpen || isStatsOpen || isLeaderboardOpen || isSettingsOpen || isGameOverOpen;

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
            setRoundTimes(rt => rt.concat(roundDuration));
        } else {
            setGameOver(go => true);

            updateStats(roundTimes)
            onGameOverOpen();
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

                setCurrentBit(bt => bt + 1);

                // Update overall stats
                // updateOverallStats();
                updateStats(roundTimes);

                clearInterval(intervalId);

                onGameOverOpen();
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
    }, [playing, currentBit, delay, roundTimes, updateStats, onGameOverOpen]);   // , updateOverallStats

    useEffect(() => {
        const onKeyDown = (event) => {
            if(event.keyCode === 32) {
                if(document.activeElement instanceof HTMLButtonElement) {
                    if(!(document.activeElement === submitButton.current || document.activeElement === startButton.current)) {
                        return;
                    }
                }

                if(dialogOpen) {
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
    
    }, [playing, playerNumber, dialogOpen]);

    useEffect(() => {
        let newDelay = null;
        if(roundTimes.length <= 120) {
            newDelay = INITIAL_DELAY * (DELAY_DECREASE ** (roundTimes.length % LEVEL_UP));
        } else {
            newDelay = INITIAL_DELAY * (DELAY_DECREASE ** (roundTimes.length - 100));
        }
        setDelay(dl => newDelay);

    }, [roundTimes]);

    return (
        <VStack gap={3} w='full' px={1}>
            <PlayerComputer playing={playing} currentRound={roundTimes.length + 1} goalNumber={goalNumber} currentBit={currentBit} />
            <Bits playing={playing} currentBit={currentBit} currentRound={roundTimes.length + 1} goalNumber={goalNumber} />
            <PlayerHuman playing={playing} currentRound={roundTimes.length + 1} playerNumber={playerNumber} onBitChange={onPlayerBitChange} mapping={keyboardMap} />
            <Grid templateColumns='1fr 2fr 1fr' w='full' justifyItems='center' alignItems='center'>
                <GridItem>
                    <Button size='lg' colorScheme='blue' ref={startButton} onClick={nextRound} isDisabled={playing}>Start</Button>
                </GridItem>
                <GridItem>
                    <Difficulty level={Math.floor(roundTimes.length / LEVEL_UP)} delay={delay} />
                </GridItem>
                <GridItem>
                    <Button size='lg' colorScheme='blue' ref={submitButton} onClick={validateAnswer} isDisabled={!playing}>Submit</Button>
                </GridItem>
            </Grid>
            <CurrentStats roundTimes={roundTimes} />
            <GameOverDialog isOpen={isGameOverOpen} onClose={onGameOverClose} rounds={roundTimes.length} />
        </VStack>
    );
}

export default Game;