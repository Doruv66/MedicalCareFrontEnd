import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import appointmentsAPI from '../../API/AppointmentsAPI';

const TotalAppointmentsChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    appointmentsAPI.getAppointmentsCountPerMonth()
    .then(response => setAppointmentData(response.data.countMonth))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); 
    }
    let months = undefined;
    let counts = undefined;
    if(appointmentData !== null){
      months = Object.keys(appointmentData); 
      counts = Object.values(appointmentData);
    }

    if (chartContainer && chartContainer.current) {
      const data = {
        labels: months,
        datasets: [{
          label: 'Appointments',
          data: counts,
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
  }, [appointmentData]);

  return (
    <div>
      <canvas ref={chartContainer} width="400" height="400" />
    </div>
  );
};

export default TotalAppointmentsChart