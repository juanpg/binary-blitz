function InfoBit({playing, currentLevel, bitValue, active}) {
    return (
        <div className={`bit ${active ? 'active' : ''}`}>
            <span>{bitValue}</span>
        </div>
    );
}

export default InfoBit;