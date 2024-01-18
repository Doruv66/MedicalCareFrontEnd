import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import appointmentsAPI from '../../API/AppointmentsAPI';

const AppointmentsTodayChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [appointments, setAppointments] = useState([]);

  const refreshData = async() => {
    await appointmentsAPI.getAppointmentsCountForToday()
    .then(response => setAppointments(response.data))
    .catch(error => console.log(error))
  }
  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }
    if (chartContainer && chartContainer.current) {
      const data = {  
        labels: ['BOOKED', 'AVAILABLE'],
        datasets: [{
          data: [appointments.bookedAppointments, appointments.totalCountOfAppointments],
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
  }, [appointments]);

  return (
    <div>
      <canvas ref={chartContainer} width="400" height="400" />
    </div>
  );
};

export default AppointmentsTodayChart