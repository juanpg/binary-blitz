function GameOverDialog({dialogRef}) {
    return (
        <>
            <button type="button" ref={dialogRef} className="d-none" data-bs-toggle="modal" data-bs-target="#gameOverDialog" title="Game Over" aria-label="Game Over"></button>
            <div className="modal fade" id="gameOverDialog" tabIndex="-1" aria-labelledby="gameOverTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="gameOverTitle">Game Over</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Sorry, you lost!</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default GameOverDialog;