import React, { useEffect, useState } from 'react'
import style from './BookAppointmentCard.module.css'
import DropDown from './DropDown'
import { useWebSocket } from '../Context/WebSocketContext';
import timeSlotsAPI from '../../API/TimeSlotsAPI';
import appointmentsAPI from '../../API/AppointmentsAPI';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import Toasts from '../Toasts/Toasts';

const BookAppointmentCard = ({doctor}) => {
    const [date, setDate] = useState(null);
    const [availableTimeSlots, setAvailableTimeSlots] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const user = useUser();
    const navigate = useNavigate();
    const stompClient = useWebSocket();

    const formattedFutureDates = doctor.availableTimeSlots
      .filter(date => new Date(date.startTime) > new Date())
      .map(date => {
        const formattedDate = new Date(date.startTime);
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        return formattedDate.toLocaleDateString('en-US', options);
      });

    const uniqueFormattedDates = [...new Set(formattedFutureDates)];

    const formattedTimeSlots = availableTimeSlots !== null ? availableTimeSlots.map(slot => {
      const startTime = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const endTime = new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return `${startTime} - ${endTime}`;
    }) : null;

    const refreshTimeSlots = (timestamp, doctorId) => {
      const matchingDate = doctor.availableTimeSlots.find(date => {
        const formattedDate = new Date(date.startTime);
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        return formattedDate.toLocaleDateString('en-US', options) === timestamp;
      });
      if (matchingDate) {
        const isoFormattedTimestamp = new Date(matchingDate.startTime).toISOString();
        console.log('Formatted Timestamp:', isoFormattedTimestamp);
        
        timeSlotsAPI.getByDate(isoFormattedTimestamp, doctorId)
          .then((response) => setAvailableTimeSlots(response.data.timeSlots))
          .catch((error) => console.log(error));
      } else {
        console.log('No matching date found');
      }
    };

    const sendNotificationMessage = (doctorId, date) => {
      if (!stompClient || !stompClient.connected) {
        console.error("WebSocket client not connected.");
        return;
      }
      console.log(date)
      const payload = {
        'content': `You have a new appointment booked on ${new Date(date).toISOString().split('T')[0]}`,
        'receiverId': doctorId
      };
    
      if (payload.content) {
        stompClient.publish({
          destination: `/user/${payload.receiverId}/queue/notifications`,
          body: JSON.stringify(payload)
        });
      }
    };

    const handleDateChange = (date) => {
      setDate(date);
      setSelectedTimeSlot(null);
      refreshTimeSlots(date, doctor.accountId);
    } 
    
    const createAppointment = () => {
      if(date === null && selectedTimeSlot === null) {
        Toasts.warn("Please Select a Time Slot");
        return;
      }
      const matchingTimeSlot = availableTimeSlots.find(slot => {
        const startTime = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const endTime = new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return selectedTimeSlot === `${startTime} - ${endTime}`;
      })
      appointmentsAPI.createAppointment({
        timeSlot: matchingTimeSlot,
        patient: user,
        doctor: doctor,
        appointmentStatus: "BOOKED"
      })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      navigate("/");
      sendNotificationMessage(doctor.accountId, matchingTimeSlot.startTime);
      Toasts.success('Appointment booked succesfuly');
    }

  return (
    doctor !== null  ? (
        <div className={style.bookappointment_card}>
          <div>
              <h2>Select the date for your appointment :</h2>
              <DropDown placeholder={"select date"} date={date} setDate={handleDateChange} data={uniqueFormattedDates}/>
          </div>
          <div>
              <h2>Select the Time Slot that fits for you :</h2>
              <DropDown placeholder={"select timeslot"} date={selectedTimeSlot} setDate={setSelectedTimeSlot} data={formattedTimeSlots}/>
          </div>
        <button className={style.btn} onClick={() => createAppointment()}>Book Appointment</button>
      </div>
    ) : (
      <div>Doctor is unavailable </div>
    )
  )
}

export default BookAppointmentCard;