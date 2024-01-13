import React, { useEffect, useState } from 'react'
import style from './DoctorPage.module.css'
import { useParams } from 'react-router-dom'
import DoctorWelcomeCard from '../components/DoctorPageComponents/DoctorWelcomeCard'
import DescriptionReviews from '../components/DoctorPageComponents/DescriptionReviews'
import DoctorTimeSlots from '../components/DoctorPageComponents/DoctorTimeSlots'
import doctorAPI from '../API/DoctorAPI'


const DoctorPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const getDoctor = (id) => {
    doctorAPI.getDoctor(id)
    .then((response) => {
      setDoctor(response.data.account)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getDoctor(id);      
  }, [id])

  return (
    <div>
      {
        doctor !== null  ? (
        <div className={style.wrapper}>
          <div className={style.doctor_content}>
            <DoctorWelcomeCard doctor={doctor}/>
            <DescriptionReviews doctor={doctor}/>
          </div>
          <div className={style.timeslots}>
            <DoctorTimeSlots doctor={doctor}/>
          </div>
          
        </div>
        ) : (
          <h1>Not found</h1>
        )
      }
    </div>
  )
}

export default DoctorPage