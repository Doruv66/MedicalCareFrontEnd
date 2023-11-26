import React from 'react'
import style from './Profile.module.css'
import { useUser } from '../components/Context/UserContext'
import Error401 from '../components/ErrorComponents/Error401';
import image from '../assets/profilePicture.png'
import ProfileInformation from '../components/ProfileInformation/ProfileInformation';


const Profile = () => {
    const user = useUser();

    if(!user) {
        return <Error401 />
    }

  return (
        <div className={style.wrapper}>
            <div className={style.user_image}>
                <img src={image} alt="user profile image" />
            </div>
            <div className={style.user_information}>
                <ProfileInformation />
            </div>
        </div>
  )
}

export default Profile