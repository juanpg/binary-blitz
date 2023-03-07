# Binary Blitz

This is a recreation of an old Windows game called the same, Binary Blitz.  It's a very simple game, with the goal of converting a random integer from 1 to 255 to binary, as many rounds as possible, as fast as possible.

You can use the mouse or the keyboard (keys 'a' through 'f' and 'j' through ';') to toggle the individual bits.

## Goal

The objective of the game is to convert decimal numbers, from 1 to 255, to binary, as fast as possible, as many rounds as possible without mistake.

## Instructions

1. You are blue, the computer is red.
2. Click the 'Start' button to begin a new game.
3. A random number from 1 to 255 will be displayed on the right. Use the mouse or the keyboard to toggle the blue zeros and ones, so they display the binary equivalent of the decimal number.
4. You can use the keyboard keys a, s, d and f to control bits 128, 64, 32 and 16, and keys j, k, l and ; to control bits 8, 4, 2 and 1.
5. Click the 'Submit' button or press the Spacebar to confirm your choices. This will validate your answer.
6. Click the 'Start' button once again, or press the Spacebar, to begin a new round.
7. At rounds 21, 41, 61, 81 and 101 the game increases the level of difficulty as explained below, but the computer delay is reset to 2 seconds.

## Difficulty levels

The game has five difficulty levels, which increase every 20 rounds. At each level, the computer delay is reset to 2s, and a new challenge is introduced:

* At level 21, the number to convert disappears after a few seconds.
* At level 41, the bit values (128, 64, 32, etc.) disappear.
* At level 61, the computer number is no longer shown.
* At level 81, you can't unclick a bit.
* At level 101, your conversion number is no longer shown.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
