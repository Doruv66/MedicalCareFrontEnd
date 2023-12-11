import React from 'react'
import { useEffect, useState } from 'react';
import style from './BookAppointment.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import DoctorWelcomeCard from '../components/DoctorPageComponents/DoctorWelcomeCard';
import accountsAPI from '../API/AccountsAPI';
import BookAppointmentCard from '../components/BookAppointmentComponents/BookAppointmentCard';
import { useUser } from '../components/Context/UserContext';
import Error401 from '../components/ErrorComponents/Error401';

const BookAppointment = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const user = useUser();
  const navigate = useNavigate();

  const getDoctor = (id) => {
      accountsAPI.getAccount(id)
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
          const redirectTimer = setTimeout(() => {
              navigate('/login');
          }, 3000);

          return () => clearTimeout(redirectTimer);
      }
  }, [navigate]);

  if (user === null) {
      return <Error401 />;
  }

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