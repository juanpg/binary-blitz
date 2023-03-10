import { useEffect, useRef } from "react";

function CurrentChart({roundTimes}) {
    // Define the style for the chart container
    const containerStyle = {
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    // Define the style for the chart canvas
    const canvasStyle = {
        width: `100%`,
        height: `200px`,
    };

    // Create a ref for the canvas element
    const canvasRef = useRef(null);

    // Draw the chart when the component mounts or the roundTimes prop changes
    useEffect(() => {
        if(canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            // Calculate the maximum and minimum times in the roundTimes array
            const maxTime = Math.ceil(Math.max(...roundTimes));
            const minTime = 0 //Math.min(...roundTimes);
            const avgTime = roundTimes.length > 0 ? roundTimes.reduce((t, i) => t + i, 0) / roundTimes.length : 0;

            // Define the x and y scales for the chart
            const xScale = (canvas.width - 20) / roundTimes.length; // Set the x scale to 50 pixels per event
            const yScale = (canvas.height - 20) / (maxTime - minTime + 1); // Set the y scale to 2 pixels per second

            // Calculate the width and height of the chart
            const width = roundTimes.length * xScale;
            const height = (maxTime - minTime) * yScale;

            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
            // context.fillStyle = getComputedStyle( document.querySelector(":root")).getPropertyValue('--bs-gray-400')
            // context.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the x-axis
            context.beginPath();
            context.strokeStyle = getComputedStyle( document.querySelector(":root")).getPropertyValue('--bs-emphasis-color')
            context.lineWidth = 2;
            context.moveTo(10, canvas.height - 10);
            context.lineTo(canvas.width - 10, canvas.height - 10);
            context.stroke();

            // Draw the y-axis
            context.beginPath();
            context.lineWidth = 2;
            context.moveTo(10, 10);
            context.lineTo(10, canvas.height - 10);
            context.stroke();

            context.setLineDash([3, 6]);
            context.lineWidth = 1;
            for (let i = 20; i <= 100; i += 20) {
                if(roundTimes.length >= i) {
                    context.beginPath();
                    context.moveTo(10 + i * xScale, 10);
                    context.lineTo(10 + i * xScale, canvas.height - 10);
                    context.stroke();    
                }
            }

            // Draw the average
            const y = 10 + (maxTime - avgTime) * yScale;
            context.setLineDash([3, 6]);
            context.beginPath();
            context.strokeStyle = 'red';
            // context.lineWidth = 1;
            context.moveTo(10, y);
            context.lineTo(canvas.width - 10, y);
            context.stroke();

            // Reset the line dash pattern to a solid line
            context.setLineDash([]);

            // Draw the data points
            context.fillStyle = getComputedStyle( document.querySelector(":root")).getPropertyValue('--bs-primary');
            for (let i = 0; i < roundTimes.length; i++) {
                const x = xScale + 10 + i * xScale;
                const y = 10 + (maxTime - roundTimes[i]) * yScale;
                context.beginPath();
                context.arc(x, y, 1, 0, 2 * Math.PI);
                context.fill();
            }
        }
    }, [roundTimes]);

    return (
        <div style={containerStyle}>
            <canvas ref={canvasRef} style={canvasStyle}></canvas>
        </div>
    );
}

export default CurrentChart;