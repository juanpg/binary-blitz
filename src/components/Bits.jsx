import InfoBit from "./InfoBit";

function Bits({currentBit, currentRound, goalNumber}) {
    const allBits = ['128', '64', '32', '16', '8', '4', '2', '1'];
    const level = Math.floor((currentRound - 1) / 20);
    const displayGoal = level === 0 || currentBit < 2;
    const displayBits = level < 2;
    return (
        <div className="number bits">
            {allBits.map((bitValue, index) => <InfoBit key={index} bitValue={displayBits ? bitValue : ''} active={index === currentBit} />)}
            <div className="bit result">{displayGoal ? goalNumber : ''}</div>
        </div>
    )
}

export default Bits;