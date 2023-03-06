import { useEffect } from "react";

function PlayerBit({playing, bit, value, onChange}) {
    const onClick = () => {
        if(playing) {
            onChange(bit);
        }
    }

    useEffect(() => {
        const thisLetter = [';', 'l', 'k', 'j', 'f', 'd', 's', 'a'][bit];

        const onKeyDown = (event) => {
            if(playing && thisLetter === event.key.toLowerCase()) {
                onChange(bit);
            }
        }

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [playing, bit, onChange])
    return (
        <div className="bit" onClick={onClick}>
            <span>{value}</span>
        </div>
    );
}

export default PlayerBit;