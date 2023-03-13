import HorizontalBarChart from "./HorizontalBarChart";

function OverallStats({stats, resetStats}) {
    return (
        <div className="modal fade" id="statsDialog" tabIndex="-1" aria-labelledby="statsTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="statsTitle">Your Statistics</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="clearfix">
                            Overall
                            <button type="button" className="btn btn-danger btn-sm float-end" title="Reset Statistics" onClick={resetStats}>Reset</button>
                        </h5>
                        
                        <div className="d-flex gap-4 justify-content-center mb-3 clear">
                            <div className="align-items-center d-flex flex-column">
                                <div className="fs-5 fw-bold text-primary">{stats.statistics.totalGames}</div>
                                <div>Played</div>
                            </div>
                            <div className="align-items-center d-flex flex-column">
                                <div className="fs-5 fw-bold text-primary">{stats.statistics.highestRound}</div>
                                <div>Max round</div>
                            </div>
                            <div className="align-items-center d-flex flex-column">
                                <div className="fs-5 fw-bold text-primary">{stats.statistics.averageRound.toFixed(1)}</div>
                                <div>Avg. round</div>
                            </div>
                        </div>
                        <h5>Games distribution</h5>
                        <HorizontalBarChart data={stats.distribution} />
                        <h5>Top 5 games</h5>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Rounds</th>
                                    <th scope="col">Avg. time per round</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stats.top10.length === 0
                                    ? <tr className="table-info">
                                        <th scope="row" colSpan={4}>No Data</th>
                                      </tr>
                                    : stats.top10.map((topItem, idx) => {
                                        return (
                                            <tr key={idx}>
                                                <th scope="row">{idx+1}</th>
                                                <td>{(new Date(topItem.date)).toLocaleString()}</td>
                                                <td className="text-end">{topItem.rounds}</td>
                                                <td className="text-end">{topItem.averageTime.toFixed(3)}s</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OverallStats;