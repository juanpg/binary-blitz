import PlayerBit from "./PlayerBit";

function Player({playing, currentRound, playerNumber, onBitChange, mapping}) {
    const level = Math.floor((currentRound - 1) / 20);
    const displaySum = level < 5 || !playing;

    return (
        <div className="number player">
            {playerNumber.toString(2).padStart(8, '0').split('').map((bitValue, bit) => 
                <PlayerBit 
                    key={bit} 
                    playing={playing} 
                    value={bitValue} 
                    bit={7-bit} 
                    level={level}
                    onChange={onBitChange} 
                    mappedKey={mapping[bit]}
                />
            )}
            <div className="bit result rounded-4 bg-primary text-bg-primary">{displaySum ? playerNumber : ''}</div>
        </div>
    );
}

export default Player;