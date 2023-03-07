function Difficulty({level, delay}) {
    const levelDescriptions = ['Normal', 'Vanishing Goal', 'No bit values', 'No red sum', 'No unclicking', 'No blue sum'];
    let currentDifficulty = null;
    if(level <= 5) {
        currentDifficulty = levelDescriptions[level];
    } else {
        currentDifficulty = levelDescriptions[levelDescriptions.length - 1];
    }
    return (
        <div className="d-flex flex-column text-center">
            <div>Difficulty: {currentDifficulty}</div>
            <div>Computer Delay: {(delay / 1000).toFixed(3)}s</div>
        </div>
    )
}

export default Difficulty;