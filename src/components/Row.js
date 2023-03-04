import Bit from "./Bit";

function Row({ bits, number, label, onBitClick, activeIndex}) {
    return (
      <div className={`number ${label}`}>
        {bits.map((box, index) => (
          <Bit
            key={index}
            value={box}
            index={index}
            isActive={activeIndex === index}
            onClick={onBitClick}
          />
        ))}
        <div className='bit result'>
          {number}
        </div>
      </div>
    );
}

export default Row;  