function CurrentStats({rounds, lastRound, secondsPerRound}) {
    return (
        <div className="stats text-center">
            <div>Rounds: {rounds}</div>
            <div>Last: {lastRound.toFixed(3)}s</div>
            <div>Avg: {secondsPerRound.toFixed(3)}s</div>
        </div>
    )
}

export default CurrentStats;