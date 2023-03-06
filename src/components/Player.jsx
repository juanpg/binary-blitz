import PlayerBit from "./PlayerBit";

function Player({playing, currentLevel, playerNumber, onBitChange}) {
    return (
        <div className="number player">
            {playerNumber.toString(2).padStart(8, '0').split('').map((bitValue, bit) => 
                <PlayerBit 
                    key={bit} 
                    playing={playing} 
                    value={bitValue} 
                    bit={7-bit} 
                    onChange={onBitChange} 
                />
            )}
            <div className="bit result">{playerNumber}</div>
        </div>
    );
}

export default Player;