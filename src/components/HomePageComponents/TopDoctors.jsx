import React, { useEffect, useState } from 'react'
import style from './TopDoctors.module.css'
import accountsAPI from '../../API/AccountsAPI';
import DoctorCard from '../DoctorsPageComponents/DoctorCard';

const TopDoctors = () => {
    const [doctors, setDoctors] = useState([]);

    const refreshTopDoctors = () => {
        accountsAPI.getTopDoctors()
        .then(response => setDoctors(Object.values(response.data.accounts)))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        refreshTopDoctors();
    }, [])

  return (
    <div className={style.topdoctors}>
        <h1>Our Top Doctors</h1>
        <ul className={style.doctors}>
            {
                doctors.length > 0 ? (
                    doctors.map(doctor => {
                    return (
                        <li key={doctor.accountId}>
                        <DoctorCard doctor={doctor} />
                        </li>
                    )
                    })
                ) : (
                    <div></div>
                )
            }
        </ul>
  </div>
  )
}

export default TopDoctors