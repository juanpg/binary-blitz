function InfoBit({playing, currentRound, bitValue, active, className}) {
    return (
        <div className={`bit rounded-4 ${className} ${active ? 'active' : ''}`}>
            <span>{bitValue}</span>
        </div>
    );
}

export default InfoBit;