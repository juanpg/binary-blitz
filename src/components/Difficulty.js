function Difficulty({round, delay}) {
    let currentDifficulty = 'Normal';
    return (
        <div>
            <div>Difficulty: {currentDifficulty}</div>
            <div>Computer Delay: {delay.toFixed(3)}s</div>
        </div>
    )
}

export default Difficulty;