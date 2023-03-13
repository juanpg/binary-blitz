import { useCallback, useEffect, useState } from "react";

function PlayerBit({playing, bit, value, level, onChange, mappedKey}) {
    const [changed, setChanged] = useState(false);

    const triggerChange = useCallback(() => {
        if(level < 4) {
            onChange(bit)
        } else {
            if(!changed) {
                setChanged(chg => true);
                onChange(bit);
            }
        }
    }, [bit, changed, level, onChange])
    const onClick = () => {
        if(playing) {
            triggerChange();
        }
    }

    useEffect(() => {
        // const thisLetter = [';', 'l', 'k', 'j', 'f', 'd', 's', 'a'][bit];
        const thisLetter = mappedKey.toLowerCase();

        const onKeyDown = (event) => {
            if(playing && thisLetter === event.key.toLowerCase()) {
                triggerChange();                
            }
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [playing, bit, triggerChange, mappedKey]);

    useEffect(() => {
        if(!playing) {
            setChanged(chg => false);
        }
    }, [playing]);

    return (
        <div className="bit rounded-4 bg-primary text-bg-primary" onClick={onClick}>
            <span>{value}</span>
        </div>
    );
}

export default PlayerBit;