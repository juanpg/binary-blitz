function InfoBit({playing, currentRound, bitValue, active}) {
    return (
        <div className={`bit ${active ? 'active' : ''}`}>
            <span>{bitValue}</span>
        </div>
    );
}

export default InfoBit;