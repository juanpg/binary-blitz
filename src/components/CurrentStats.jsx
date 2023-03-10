import CurrentChart from "./CurrentChart";

function CurrentStats({rounds, lastRound, roundTimes}) {
    const totalTime = roundTimes.reduce((t, i) => t + i, 0);
    const secondsPerRound = rounds > 0 ? totalTime / rounds / 1000 : 0;
    const projectedScore = secondsPerRound > 0 ? Math.floor(Math.log(secondsPerRound/8/2)/Math.log(0.95)+101) : 0;

    return (
        <>
            <div className="stats text-center">
                <div>Current score: {rounds}</div>
                <div>Projected score: {projectedScore}</div>
                <div>Last: {lastRound.toFixed(3)}s</div>
                <div>Avg: {secondsPerRound.toFixed(3)}s</div>
            </div>
            <div className="chart">
                <CurrentChart roundTimes={roundTimes} />
            </div>
        </>
    )
}

export default CurrentStats;