function OverallStats() {
    return (
        <div className="modal fade" id="statsDialog" tabIndex="-1" aria-labelledby="statsTitle" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="statsTitle">Statistics</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverallStats;