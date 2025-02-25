import React from 'react'
import { useEffect, useState } from 'react';
import style from './BookAppointment.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import DoctorWelcomeCard from '../components/DoctorPageComponents/DoctorWelcomeCard';
import BookAppointmentCard from '../components/BookAppointmentComponents/BookAppointmentCard';
import { useUser } from '../components/Context/UserContext';
import Error401 from '../components/ErrorComponents/Error401';
import doctorAPI from '../API/DoctorAPI';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const user = useUser();
  const navigate = useNavigate();

  const getDoctor = (id) => {
      doctorAPI.getDoctor(id)
          .then((response) => {
              setDoctor(response.data.account);
          })
          .catch((error) => {
              console.log(error);
          });
  };

  useEffect(() => {
      getDoctor(doctorId);
  }, [doctorId]);

  useEffect(() => {
      if (user === null) {
        navigate('/login');
      }
  }, [navigate]);
  

  return (
      doctor !== null ? (
          <div className={style.book_appointment}>
              <div className={style.book_form}>
                  <BookAppointmentCard doctor={doctor} />
              </div>
              <div className={style.book_doctor}>
                  <DoctorWelcomeCard doctor={doctor} />
              </div>
          </div>
      ) : (
          <h1>Doctor Not Available</h1>
      )
  );
};

export default BookAppointment;