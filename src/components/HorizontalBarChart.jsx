import React from 'react';

function Bar({count, level, max}) {
  const barWidth = Math.max(5, (count / max) * 100);
//   const valueLabelPosition = `calc(${barWidth}% + 5px)`;

  const labels = {
    '0': '0 - 20',
    '1': '21 - 40',
    '2': '41 - 60',
    '3': '61 - 80',
    '4': '81 - 100',
    '5': '101 - 120'
  }

  const label = labels[level] ?? '121+';

  return (
    <div className="bar mb-1">
      <div className="bar-label text-end">{label}</div>
      <div className="bar-wrapper">
        <div className="bar-progress" style={{ width: `${barWidth}%` }}>
          <div className="bar-value">
            {count}
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizontalBarChart({data}) {
    const max = Object.values(data).reduce((t, i) => Math.max(t, i), 0);
    const maxLevel = Object.keys(data).reduce((t, i) => Math.max(t, i), -1);
    const chartEntries = {};
    for(let i=0; i<=maxLevel; i++) {
        chartEntries[i] = data[i] ?? 0;
    }

    return (
        <div className="chart mb-3">
            {Object.keys(chartEntries).length > 0 ?
                (
                    <>
                        {Object.entries(chartEntries).map(([level, count], index) => {
                            return (
                                <Bar key={index} count={count} level={level} max={max} />
                            )}
                        )}
                        <div className="y-axis-label fw-bold">Rounds</div>
                    </>
                ) :
                <table className='table table-info'><tbody><tr><th>No Data</th></tr></tbody></table>
            }
        </div>
    );
}

export default HorizontalBarChart;