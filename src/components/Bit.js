function Bit({value, index, isActive, onClick}) {
    return (
      <div onClick={() => onClick && onClick(index) } className={`bit ${index} ${isActive ? "active" : ""}`}>
        <span>{value}</span>
      </div>
    );
}

export default Bit;