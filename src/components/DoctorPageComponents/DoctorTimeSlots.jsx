import React from 'react'
import style from './DoctorTimeSlots.module.css'

const DoctorTimeSlots = () => {
  return (
    <div className={style.wrapper}>
      <h2>Available Time Slots</h2>
      <ul>
        <li><p>Monday: 14:00 - 18:00</p></li>
        <li><p>Tuesday: 14:00 - 18:00</p></li>
        <li><p>Wensday: 14:00 - 18:00</p></li>
        <li><p>Thursday: 14:00 - 18:00</p></li>
        <li><p>Friday: 14:00 - 18:00</p></li>
        <li><p>Sunday: 14:00 - 18:00</p></li>
      </ul>
      <button>Book Appointment</button>
    </div>
  )
}

export default DoctorTimeSlots