import React from 'react'
import { useEffect, useState } from 'react';
import style from './BookAppointment.module.css'
import { useParams } from 'react-router-dom'
import DoctorWelcomeCard from '../components/DoctorPageComponents/DoctorWelcomeCard';
import accountsAPI from '../API/AccountsAPI';
import BookAppointmentCard from '../components/BookAppointmentComponents/BookAppointmentCard';
import { useUser } from '../components/Context/UserContext';
import Error401 from '../components/ErrorComponents/Error401';

const BookAppointment = () => {
    const { doctorId } = useParams();
    const [doctor, setDoctor] = useState(null);
    const user = useUser();

    const getDoctor = (id) => {
        accountsAPI.getAccount(id)
        .then((response) => {
          setDoctor(response.data.account)
        })
        .catch((error) => console.log(error))
      }
      useEffect(() => {
        getDoctor(doctorId);
      }, [doctorId])

  return (
    user !== null ? (
        doctor !== null ? (
          <div className={style.book_appointment}>
              <div className={style.book_form}>
                  <BookAppointmentCard doctor={doctor}/>
              </div>
              <div className={style.book_doctor}>
                  <DoctorWelcomeCard doctor={doctor}/>
              </div>
          </div>
      ) : (
          <h1>Doctor Not Available</h1>
      )
    ) : (
      <Error401 />
    )
    
  )
}

export default BookAppointment