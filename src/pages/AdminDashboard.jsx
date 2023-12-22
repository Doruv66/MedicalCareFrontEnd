import React from 'react'
import style from './AdminDashboard.module.css'
import AppointmentsTodayChart from '../components/AdminDashboardComponents/AppointmentsTodayChart'
import TotalAppointmentsChart from '../components/AdminDashboardComponents/TotalAppointmentsChart'
import { useUser } from '../components/Context/UserContext'

const AdminDashboard = () => {
  const user = useUser();

  if (user === null) {
    return <Error401 />;
  } else if (user.accountType !== "ADMIN") {
    return <Error401 />;
  }

  return (
    <div className={style.dashboard}>
      <div>
        <h1>ADMIN DASHBOARD</h1>
      </div>
      <div className={style.charts}>
        <div className={style.chart}>
          <h2>APPOINTMENTS TODAY</h2>
          <AppointmentsTodayChart />
        </div>
        <div className={style.chart}>
          <h2>TOTAL APPOINTMENTS</h2>
          <TotalAppointmentsChart />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard