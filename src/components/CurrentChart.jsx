// import { useEffect, useRef } from "react";
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                filter: item => ['Rounds', 'Average'].includes(item.text)
            }
        }
    },
    scales: {
        x: {
            title: {
                text: 'Rounds',
                display: true
            }
        },
        y: {
            beginAtZero: true,
            title: {
                text: 'Time (s)',
                display: true    
            }
        }
    }
}

function CurrentChart({roundTimes}) {
    
    const avgTime = roundTimes.length > 0 ? roundTimes.reduce((t, i) => t + i, 0) / roundTimes.length / 1000 : 0;

    const data = {
        labels: roundTimes.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Rounds',
                data: roundTimes.map(rt => (rt / 1000).toFixed(3)),
                borderColor:  getComputedStyle( document.querySelector(":root")).getPropertyValue('--bs-primary'),
                backgroundColor: getComputedStyle( document.querySelector(":root")).getPropertyValue('--bs-primary'),
                borderWidth: 2,
                radius: 2
            },
            {
                label: 'Average',
                data: roundTimes.map((_) => avgTime.toFixed(3)),
                borderColor:  getComputedStyle( document.querySelector(":root")).getPropertyValue('--bs-danger'),
                backgroundColor: getComputedStyle( document.querySelector(":root")).getPropertyValue('--bs-danger'),
                pointStyle: false,
                borderWidth: 1
            }
        ]
    }

    const level = Math.floor(roundTimes.length / 20);
    for(let i = 1; i <= Math.min(5, level); i++) {
        console.log(i, i * 20, level);
        const dataset = {
            label: `Level ${i}`,
            data: [{x: i*20, y: 0}, {x: i*20, y:6}],
            borderColor: 'black',
            backgroundColor: 'black',
            pointStyle: false,
            borderWidth: 1
        };
        data.datasets.push(dataset);
    }

    return (
        <div>
            <h5>Time per round (s)</h5>
            <Line options={options} data={data} />
        </div>
    );
}

export default CurrentChart;