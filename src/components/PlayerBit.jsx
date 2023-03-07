import { useEffect, useState } from "react";

function PlayerBit({playing, bit, value, level, onChange}) {
    const [changed, setChanged] = useState(false);
    const onClick = () => {
        if(playing) {
            if(level < 4) {
                onChange(bit);
            } else {
                if(!changed) {
                    setChanged(chg => true);
                    onChange(bit);
                }
            }
        }
    }

    useEffect(() => {
        const thisLetter = [';', 'l', 'k', 'j', 'f', 'd', 's', 'a'][bit];

        const onKeyDown = (event) => {
            if(playing && thisLetter === event.key.toLowerCase()) {
                if(level < 4) {
                    onChange(bit);
                } else {
                    if(!changed) {
                        setChanged(chg => true);
                        onChange(bit);
                    }
                }
                
            }
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [playing, bit, onChange, changed, level])
    return (
        <div className="bit rounded-4 bg-primary" onClick={onClick}>
            <span>{value}</span>
        </div>
    );
}

export default PlayerBit;