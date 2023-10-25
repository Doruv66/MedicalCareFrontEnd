import React from 'react';
import style from './DoctorTimeSlots.module.css';

const DoctorTimeSlots = ({ doctor }) => {
  const availableTimeSlots = doctor.availableTimeSlots || [];

  const dayTimeRanges = {};

  availableTimeSlots.forEach((timeSlot) => {
    const startTime = new Date(timeSlot.startTime);
    const endTime = new Date(timeSlot.endTime);
    const day = startTime.toLocaleDateString('en-US', { weekday: 'long' });
    dayTimeRanges[day] = dayTimeRanges[day] || { earliest: startTime, latest: endTime };
    if (startTime < dayTimeRanges[day].earliest) {
      dayTimeRanges[day].earliest = startTime;
    }
    if (endTime > dayTimeRanges[day].latest) {
      dayTimeRanges[day].latest = new Date(endTime.getTime() - 3600000);
    }
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className={style.wrapper}>
      <h2>Available Time Slots</h2>
      <ul>
        {daysOfWeek.map((day) => (
          <li key={day}>
            <p>
              {day}: {dayTimeRanges[day] ? `${dayTimeRanges[day].earliest.toLocaleTimeString().slice(0, 5)} - ${dayTimeRanges[day].latest.toLocaleTimeString().slice(0, 5)}` : 'Not Available'}
            </p>
          </li>
        ))}
      </ul>
      <button>Book Appointment</button>
    </div>
  );
};

export default DoctorTimeSlots;