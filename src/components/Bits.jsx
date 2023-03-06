import InfoBit from "./InfoBit";

function Bits({currentBit, currentLevel, goalNumber}) {
    const allBits = ['128', '64', '32', '16', '8', '4', '2', '1'];

    return (
        <div className="number bits">
            {allBits.map((bitValue, index) => <InfoBit key={index} bitValue={bitValue} active={index === currentBit} />)}
            <div className="bit result">{goalNumber}</div>
        </div>
    )
}

export default Bits;