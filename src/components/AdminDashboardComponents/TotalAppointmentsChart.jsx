import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TotalAppointmentsChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    if (chartContainer && chartContainer.current) {
      const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Appointments',
          data: [120, 190, 150, 200, 180],
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          borderColor: 'white', 
          borderWidth: 2,
        }]
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white' 
            }
          },
          x: {
            ticks: {
              color: 'white' 
            }
          }
        },
        plugins: {
          legend: {
            display: false, // Hide the legend
            labels: {
              color: 'white' // Change legend label color to white
            }
          }
        }
      };

      const ctx = chartContainer.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
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

export default TotalAppointmentsChart