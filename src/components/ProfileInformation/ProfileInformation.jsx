import React, { useEffect, useState } from 'react'
import style from './ProfileInformation.module.css'
import Input from './Input'
import { FaUser } from "react-icons/fa";
import dayjs from 'dayjs';
import { GrMail } from 'react-icons/gr'
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaFileSignature } from "react-icons/fa6";;
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useUser } from '../Context/UserContext';
import accountsAPI from '../../API/AccountsAPI';
import 'react-toastify/dist/ReactToastify.css';
import Toasts from '../Toasts/Toasts';
import userValidators from '../Validators/UserValidators';




const ProfileInformation = () => {
  const [error, setError] = useState('');
  const user = useUser();
  const [userProfile, setUserProfile] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dateOfBirth: null
  });

  const setProperty = (property, value) => {
    setUserProfile(prevState => ({
      ...prevState,
      [property]: value
    }));
  };


  const updatePatient = (id, data) => {
    if(userValidators.validateEmail(data.email) && userValidators.validateUsername(data.username) && userValidators.validateLastName(data.lastName) && userValidators.validateName(data.firstName) && data.dateOfBirth !== null) {
      accountsAPI.updatePatient(id, data)
      .then(response => console.log(response))
      .catch(error => console.log(error));
    }
  }

  useEffect(() => {
    setUserProfile({
      username: user.username || '',
      email: user.email || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      dateOfBirth: user.dateOfBirth || null,
      password: user.password
    });
  }, [user]);

  return (
    <div className={style.wrapper}>
        <Input icon={<FaUser />} type="text" name="Username" value={userProfile.username} setProperty={value => setProperty('username', value)} validator={userValidators.validateUsername} setError={setError} errorMessage='Username should be alphanumeric and 3-20 characters long.'/>
        <Input icon={<BsFillPersonVcardFill />} type="text" name="First Name" value={userProfile.firstName} setProperty={value => setProperty('firstName', value)} validator={userValidators.validateName} setError={setError} errorMessage='Field should contain only letters.'/>
        <Input icon={<FaFileSignature />} type="text" name="Last Name" value={userProfile.lastName} setProperty={value => setProperty('lastName', value)} validator={userValidators.validateLastName} setError={setError} errorMessage='Invalid email format.'/>
        <Input icon={<GrMail />} type="text" name="Email" value={userProfile.email} setProperty={value => setProperty('email', value)} validator={userValidators.validateEmail} setError={setError} errorMessage='Field should contain only letters.'/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
              <DatePicker
                label="Birth Date"
                value={dayjs(userProfile.dateOfBirth)}
                onChange={(newValue) => setProperty('dateOfBirth', newValue)}
                sx={{
                  '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: '1px solid white' },                           
                  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },  
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },
                  "& .MuiSvgIcon-root": {color: "white"},
                  '& .MuiInputLabel-root': {color: "white"},
                  '& .MuiInputBase-input': {color: "white"},
                }}
              />
          </DemoContainer>
        </LocalizationProvider>
        <p>{error}</p>
        <button className={style.btn} onClick={() => {
          updatePatient(user.accountId, userProfile);
          Toasts.success('Profile Updated With Success');
        }}>Update Profile</button>
    </div>
    
  )
}

export default ProfileInformation