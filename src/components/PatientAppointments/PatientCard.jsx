import React, { useEffect } from 'react'
import style from './PatientCard.module.css'
import { FaHospitalUser } from "react-icons/fa6";
import { useUser } from '../Context/UserContext';

const PatientCard = ({user}) => {

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric'};
        return date.toLocaleDateString('en-GB', options).replace(/\//g, '/');
    }
    
  return (
    <div className={style.wrapper}>
        <FaHospitalUser className={style.icon}/>
        <div className={style.user_info}>
            <p>Name:  {user.firstName}</p>
            <p>Last Name:  {user.lastName}</p>
            <p>Birth Date: {formatDate(user.dateOfBirth)}</p>
        </div>
    </div>
  )
}

export default PatientCard