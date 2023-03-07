function Help() {
  return (
    <div className="modal fade" id="helpDialog" tabIndex="-1" aria-labelledby="helpTitle" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="helpTitle">Binary Blitz Help</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <h4>Goal</h4>
                    <p>The objective of the game is to convert decimal numbers, from 1 to 255, to binary, as fast as possible, as many rounds as possible without mistake.</p>
                    <h4>Instructions</h4>
                    <p>
                        <ol>
                            <li>You are blue, the computer is red.</li>
                            <li>Click the 'Start' button to begin a new game.</li>
                            <li>A random number from 1 to 255 will be display on the right. Use the mouse or the keyboard to toggle the blue zeros and ones until they display the binary equivalent of the decimal number.</li>
                            <li>You can use the keyboard keys <b>a</b>, <b>s</b>, <b>d</b> and <b>f</b> to control bits 128, 64, 32 and 16, and keys <b>j</b>, <b>k</b>, <b>l</b> and <b>;</b> to control bits 8, 4, 2 and 1.</li>
                            <li>Click the 'Submit' button, or press the Spacebar to confirm your choices and validate your answer.</li>
                            <li>Click the 'Start' button once again, or press the Spacebar, to begin a new round.</li>
                            <li>At rounds 21, 41, 61, 81 and 101 the game increases the level of difficulty as explained below, but the computer delay is reset to 2 seconds.</li>
                        </ol>
                    </p>
                    <h4>Difficulty levels</h4>
                    <p>
                        <ul>
                            <li>At level 21, the number to convert disappears after a few seconds.</li>
                            <li>At level 41, the bit values (128, 64, 32, etc.) disappear.</li>
                            <li>At level 61, the computer number is no longer shown.</li>
                            <li>At level 81, you can't unclick a bit.</li>
                            <li>At level 101, your conversion number is no longer shown.</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Help;