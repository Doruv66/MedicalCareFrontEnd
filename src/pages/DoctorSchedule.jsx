import React, {useEffect, useState} from 'react'
import style from './DoctorSchedule.module.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import Modal from 'react-modal';
import './CalendarStyles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import appointmentsAPI from '../API/AppointmentsAPI'
import Error401 from '../components/ErrorComponents/Error401';
import { useUser } from '../components/Context/UserContext'
import Toasts from '../components/Toasts/Toasts';
import { useNavigate } from 'react-router-dom';
import AvailabilityPicker from '../components/DoctorSchedule/AvailabilityPicker';

const localizer = momentLocalizer(moment);

const DoctorSchedule = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const user = useUser();
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([]);

  const refreshDoctors = (docId) => {
    appointmentsAPI.getDoctorAppointments(docId)
    .then(response => {
      const newappointments = response.data.appointments.map((app) => ({
          appointment: app,
          title: `${app.patient.firstName} ${app.patient.lastName}`,
          start: new Date(app.timeSlot.startTime), 
          end: new Date(app.timeSlot.endTime)
      }));
      setAppointments(newappointments);
    })
    .catch(console.error())
  };

  const updateAppointment = (app) => {
    console.log(app.timeSlot.endTime)
    if(new Date(app.timeSlot.endTime) < new Date()) {
      appointmentsAPI.updateAppointment(app.appointmentId, {
        timeSlot: app.timeSlot,
        patient: app.patient,
        doctor: app.doctor,
        appointmentStatus: "COMPLETED",
      })
      .catch(error => console.log(error))
      setModalIsOpen(false);
      Toasts.success("Appointment Completed Succesfuly")
    } else {
      Toasts.warn("You can't complete the appointment before time")
    }
  }

  const handleSelectEvent = (event) => {
    if(event.appointment.appointmentStatus === "BOOKED") {
      setModalIsOpen(true);
      setSelectedEvent(event.appointment);
    } else {
      Toasts.warn("Appointment already marked")
    }
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let eventStyle = {};
  
    if (event.appointment.appointmentStatus === "COMPLETED" || event.appointment.appointmentStatus === "REVIEWED") {
      eventStyle = {
        backgroundColor: 'green',
        color: 'white',
      };
    }
    return {
      style: eventStyle,
    };
  };

  


  useEffect(() => {
    const timer = setTimeout(() => {
      refreshDoctors(user.accountId)
    }, 50); 
    return () => clearTimeout(timer);

  }, [user, modalIsOpen])

  if (user === null) {
    return <Error401 />;
  } else if (user.accountType !== "DOCTOR") {
    return <Error401 />;
  }

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h2>WELCOME TO YOUR SCHEDULE</h2>
        <AvailabilityPicker />
      </div>
      <div className={style.calendar}>
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          onSelectEvent={handleSelectEvent}
          style={{ height: 600 }}
          eventPropGetter={eventStyleGetter}
          min={moment('2023-12-15T08:00:00').toDate()}
          max={moment('2023-12-15T19:00:00').toDate()}
        />
      </div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className={style.modal_wrapper}
          overlayClassName={style.custom_overlay}
          contentLabel="Mark Appointment Completed"
          >
            <div>
              <h2 className={style.modla_heading}>
                Do you want to complete this appointment?
              </h2>
              <div className={style.modal_buttons}>
                <button onClick={() => updateAppointment(selectedEvent)}>Complete</button>
                <button onClick={() => setModalIsOpen(false)}>Cancel</button>
              </div>
            </div>
        </Modal>
    </div>
  );
}

export default DoctorSchedule