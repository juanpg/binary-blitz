import React, { useState, useEffect } from 'react';

import Row from "./Row";
import Difficulty from './Difficulty';
import Stats from './Stats';

function Game() {
    const [gameState, setGameState] = useState({
        gameOver: true,
        allowStart: true,
        allowSubmit: false,
        timerSpeed: 2000,
        totalTime: 0,
        totalRounds: 0,
        lastRoundTime: 0
    });
    const [roundState, setRoundState] = useState({
        goalNumber: null,
        currentBit: -1,
        computerNumber: '00000000',
        playerNumber: '00000000',
        roundStartTime: null
    });

    function startNextRound() {

        if(gameState.gameOver) {
            setGameState(prevState => { return {
                ...prevState,
                gameOver: false,
                allowStart: false,
                allowSubmit: true,
                timerSpeed: 2000,
                totalTime: 0,
                totalRounds: 0,
                lastRoundTime: 0
            }});
        }

        setGameState(prevState => { return {
            ...prevState,
            allowStart: false,
            allowSubmit: true
        }});

        setRoundState(prevState => { return {
            goalNumber: Math.floor(Math.random() * 255) + 1,
            currentBit: 0,
            computerNumber: '00000000',
            playerNumber: '00000000',
            roundStartTime: performance.now()
        }});

        // Start the timer
        // setTimeout(showNextComputerBit, timerSpeed);
    }

    function togglePlayerBit(index) {
        if (gameState.gameOver || roundState.currentBit === -1) {
            return;
        }
    
        const newPlayerNumber = roundState.playerNumber.split('');
        newPlayerNumber[index] = newPlayerNumber[index] === '0' ? '1' : '0';

        setRoundState(prevState => { return {
            ...prevState, 
            playerNumber: newPlayerNumber.join('')
        }});
    }
  
    // Function to handle the "Check Answer" button click
    function validateAnswer() {
        const roundDuration = performance.now() - roundState.roundStartTime;

        if (parseInt(roundState.playerNumber, 2) === roundState.goalNumber) {
            setGameState(prevState => { return {
                ...prevState,
                allowStart: true,
                allowSubmit: false,
                totalRounds: prevState.totalRounds + 1,
                totalTime: prevState.totalTime + roundDuration,
                lastRoundTime: roundDuration,
                timerSpeed: prevState.timerSpeed * 0.95
            }});
        } else {
            setGameState(prevState => { return {
                ...prevState,
                gameOver: true,
                allowStart: true,
                allowSubmit: false
            }});
            alert('You lost!');
        }
    }

    useEffect(() => {
        let intervalId = null;

        const onKeyDown = (event) => {
            console.log(gameState, roundState);
            if(event.keyCode === 32) {
                if(gameState.allowSubmit) {
                    validateAnswer();
                } else if(gameState.allowStart) {
                    startNextRound();
                }

                return;
            }

            if(!gameState.allowSubmit) {
                return;
            }

            const index = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'].indexOf(event.key.toLowerCase());

            if(index !== -1) {
                togglePlayerBit(index);
            }
        }

        const onTimeout = () => {
            console.log('timeout');
            if(roundState.currentBit > 6) {
                // Timer expired
                setGameState(prevState => { return {
                    ...prevState,
                    gameOver: true,
                    allowStart: true,
                    allowSubmit: false
                }});
                alert('You lost');
                return;
            }


            setRoundState(prevState => { 
                return {
                    ...prevState,
                    currentBit: prevState.currentBit + 1,
                    computerNumber: prevState.goalNumber.toString(2).padStart(8, '0').substring(0, prevState.currentBit + 1).padEnd(8, '0')
            }});
        }

        if(gameState.allowSubmit) {
            console.log('adding timeout');
            intervalId = setTimeout(onTimeout, gameState.timerSpeed);
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            clearTimeout(intervalId);
        };
    }, [gameState, roundState]);

    // Render the game
    return (
      <div className='game'>
        <Row bits={roundState.computerNumber.split('')} label='computer' number={parseInt(roundState.computerNumber, 2)} activeIndex="" />
        <Row bits={['128', '64', '32', '16', '8', '4', '2', '1']} label='bits' number={roundState.goalNumber} activeIndex={roundState.currentBit} />
        <Row bits={roundState.playerNumber.split('')} label='player' onBitClick={togglePlayerBit} number={parseInt(roundState.playerNumber, 2)} activeIndex="" />
        <div className='buttons'>
          <button onClick={startNextRound} disabled={!gameState.allowStart}>Start</button>
          <Difficulty delay={gameState.timerSpeed / 1000} />
          <button onClick={validateAnswer} disabled={!gameState.allowSubmit}>Submit</button>
        </div>
        <Stats rounds={gameState.totalRounds} lastRound={gameState.lastRoundTime / 1000} secondsPerRound={gameState.totalRounds > 0 ? (gameState.totalTime / gameState.totalRounds / 1000) : 0} />
      </div>
    );
}

export default Game;
  