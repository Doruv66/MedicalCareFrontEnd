import React, { useEffect, useState } from 'react'
import style from './DoctorsPage.module.css'
import DoctorsHero from '../components/DoctorsPageComponents/DoctorsHero'
import SearchBar from '../components/DoctorsPageComponents/SearchBar'
import DoctorCard from '../components/DoctorsPageComponents/DoctorCard'
import AccountsAPI from '../API/AccountsAPI'

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);

  const refreshDoctors = () => {
    AccountsAPI.getDoctors()
        .then((response) => {
          setDoctors(Object.values(response.data.accounts))
        })
        .catch((error) => {
          console.log(error);
        });
  }


  useEffect(() => {
    refreshDoctors();
  }, []);

  return (
    <div className={style.doctor_content}>
        <DoctorsHero />
        <SearchBar/>
        <ul className={style.doctors}>
          {doctors.map(doctor => {
            return (
                <li key={doctor.accountId}>
                  <DoctorCard doctor={doctor}/>
                </li>
            )
          })}
        </ul>
    </div>
  )
}

export default DoctorsPage