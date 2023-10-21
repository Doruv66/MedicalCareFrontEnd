import React, { useEffect, useState } from 'react'
import style from './DoctorPage.module.css'
import { useParams } from 'react-router-dom'
import DoctorWelcomeCard from '../components/DoctorPageComponents/DoctorWelcomeCard'
import DescriptionReviews from '../components/DoctorPageComponents/DescriptionReviews'
import DoctorTimeSlots from '../components/DoctorPageComponents/DoctorTimeSlots'
import accountsAPI from '../API/AccountsAPI'


const DoctorPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const getDoctor = (id) => {
    accountsAPI.getAccount(id)
    .then((response) => {
      setDoctor(response.data)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    getDoctor(id);
  }, [id])

    return (
    <div>
      <div>
        <DoctorWelcomeCard />
        <DescriptionReviews />
      </div>
      <DoctorTimeSlots />
    </div>
  )
}

export default DoctorPage