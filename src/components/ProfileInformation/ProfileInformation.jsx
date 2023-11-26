import React from 'react'
import style from './ProfileInformation.module.css'
import LoginInput from '../LoginSignUp/LoginInput'
import { FaUser } from "react-icons/fa";
import { GrMail } from 'react-icons/gr'
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaFileSignature } from "react-icons/fa6";
import Calendar from 'react-calendar';


const ProfileInformation = () => {
  return (
    <div className={style.wrapper}>
        <LoginInput icon={ <FaUser /> } type={"text"} name={"Username"} />
        <LoginInput icon={ <BsFillPersonVcardFill/> } type={"text"} name={"First Name"} />
        <LoginInput icon={ <FaFileSignature/> } type={"text"} name={"Last Name"} />
        <LoginInput icon={ <GrMail/> } type={"text"} name={"Email"} />
        <Calendar />
        <button className={style.btn}>Update Profile</button>
    </div>
  )
}

export default ProfileInformation