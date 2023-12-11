import React, { useState } from 'react'
import style from './AppointmentCard.module.css'
import DoctorCard from '../DoctorsPageComponents/DoctorCard'
import Modal from 'react-modal';
import appointmentsAPI from '../../API/AppointmentsAPI';
import { useNavigate } from 'react-router-dom';
import Toasts from '../Toasts/Toasts';
import LeaveReview from './LeaveReview';

const AppointmentCard = ({appointment, previous}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const openModal = () => {
      setModalIsOpen(true);
    };

    const closeModal = () => {
      setModalIsOpen(false);
    };

    const handleCancel = (appId) => {
      appointmentsAPI.deleteAppointment(appId);
      navigate("/")
      Toasts.info("Appointment Cancelled")
      closeModal();
    };

    const formatDate = (inputDate) => {
      const date = new Date(inputDate);
      const options = { day: '2-digit', month: '2-digit', year: 'numeric'};
      return date.toLocaleDateString('en-GB', options).replace(/\//g, '/');
    }
    const formatHour = (inputDate) => {
      const date = new Date(inputDate);
      const formattedHour = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
      return formattedHour;
    };

  return (
    <div className={style.appointment_card}>
        <div className={style.wrapper}>
            <div>
                <DoctorCard doctor={appointment.doctor} />
            </div>
            <div className={style.app_info}>
                <h2>Date:</h2>
                <p>{formatDate(appointment.timeSlot.startTime)}</p>
                <h3>Time Slot:</h3>
                <p>Start: {formatHour(appointment.timeSlot.startTime)}</p>
                <p>End: {formatHour(appointment.timeSlot.endTime)}</p>
                <h3>Status:</h3>
                <p>{appointment.appointmentStatus}</p>
                {appointment.appointmentStatus === "BOOKED" && !previous && 
                <button className={style.btn} onClick={openModal}>Cancel</button>}
            </div>
        </div>
        {appointment.appointmentStatus === "COMPLETED" && <LeaveReview appointment={appointment}/>}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={style.modal_wrapper}
          overlayClassName={style.custom_overlay}
          contentLabel="Cancel Appointment Confirmation"
          >
            <div>
              <h2 className={style.modla_heading}>
                Are you sure you want to cancel this appointment?
              </h2>
              <div className={style.modal_buttons}>
                <button onClick={() => handleCancel(appointment.appointmentId)}>Yes, Cancel</button>
                <button onClick={closeModal}>No, Keep</button>
              </div>
            </div>
        </Modal>
    </div>
  )
}

export default AppointmentCard