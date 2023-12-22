import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AppointmentsTodayChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    if (chartContainer && chartContainer.current) {
      const data = {
        labels: ['COMPLETED', 'FREE'],
        datasets: [{
          data: [30, 50],
          backgroundColor: ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.1)']
        }]
      };

      const options = {
        cutoutPercentage: 90, // Adjust as needed
        plugins: {
          legend: {
            display: false // Hide the legend
          }
        }
      };

      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: options
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={chartContainer} width="400" height="400" />
    </div>
  );
};

export default AppointmentsTodayChart