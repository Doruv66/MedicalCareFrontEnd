import React from 'react'
import style from './DoctorInfoForm.module.css'
import LoginInput from '../LoginSignUp/LoginInput'
import { GrMail } from 'react-icons/gr'
import { BsLockFill } from 'react-icons/bs'
import { BiSolidBookContent } from "react-icons/bi";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaFileSignature } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import userValidators from '../Validators/UserValidators'
import { useNavigate } from 'react-router-dom'
import Toasts from '../Toasts/Toasts'
import cloudinaryAPI from '../../API/cloudinaryAPI.js'
import doctorAPI from '../../API/DoctorAPI.js'

const DoctorInfoForm = (props) => {
  
  const navigate = useNavigate();

  const saveDoctor = () => {
    // check if info is valid 
    if(!userValidators.validateName(props.doctor.name) && 
      !userValidators.validateLastName(props.doctor.lastName) && 
      !userValidators.validateEmail(props.doctor.email) && 
      !userValidators.validatePassword(props.doctor.password) && 
      !userValidators.validateName(props.doctor.specialization) && 
      !userValidators.validateDescription(props.doctor.description) &&
      props.doctor.photo !== null
    ) {
      Toasts.error(`Please Complete the Form with valid data. ${props.error}`);
      return;
    }

    // Get the image data from props
    const image_data = props.doctor.photo[0].file;
    const formData = new FormData();
    formData.append('file', image_data);

    //save the image in cloud and after that save the doctor 
    cloudinaryAPI.saveImage(formData)
    .then((res) => {
      props.updateDoctor("photo", res.data.secure_url)
      doctorAPI.createDoctor({
        photo: res.data.secure_url,
        firstName: props.doctor.firstName,
        lastName: props.doctor.lastName,
        description: props.doctor.description,
        username: props.doctor.firstName + props.doctor.lastName,
        accountType: 'DOCTOR',
        email: props.doctor.email,
        password: props.doctor.password,
        specialization: props.doctor.specialization,
        availableTimeSlots: []
      })
      .catch(error => console.log(error))
    })
    .catch(err => console.log(err))
    navigate("/");
    Toasts.success("You added a new Doctor with success")

  };

  return (
    <div className={style.wrapper}>
        <h1>Doctor Info</h1>
        <LoginInput 
          icon={<BsFillPersonVcardFill />} 
          type={"text"}
          name={"First Name"} 
          property={props.doctor.firstName} 
          setProperty={value => props.updateDoctor('firstName', value)} 
          validator={userValidators.validateName} 
          setError={props.setError} 
          errorMessage={'Field should contain only letters.'} 
        />
        <LoginInput 
            icon={<FaFileSignature />} 
            type={"text"} 
            name={"Last Name"} 
            property={props.doctor.lastName} 
            setProperty={value => props.updateDoctor('lastName', value)} 
            validator={userValidators.validateLastName} 
            setError={props.setError} 
            errorMessage={'Field should contain only letters.'} 
        />
        <LoginInput 
          icon={<GrMail/>}
          type={"email"}
          name={"Email"}
          property={props.doctor.email}
          setProperty={value => props.updateDoctor('email', value)} 
          validator={userValidators.validateEmail} 
          setError={props.setError} 
          errorMessage={"Invalid email format."}
        />
        <LoginInput 
          icon={<BsLockFill/>}
          type={"password"}
          name={"Password"}
          property={props.doctor.password}
          setProperty={value => props.updateDoctor('password', value)} 
          validator={userValidators.validatePassword} 
          setError={props.setError} 
          errorMessage={"Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."}
        />
        <LoginInput 
          icon={<FaBookOpen/>}
          type={"text"}
          name={"Specialization"}
          property={props.doctor.specialization}
          setProperty={value => props.updateDoctor('specialization', value)} 
          validator={userValidators.validateName} 
          setError={props.setError} 
          errorMessage={"Field should contain only letters"}
        />
        <LoginInput
          icon={<BiSolidBookContent/>}
          type={"text"}
          name={"Description"}
          property={props.doctor.description}
          setProperty={value => props.updateDoctor('description', value)} 
          validator={userValidators.validateDescription} 
          setError={props.setError} 
          errorMessage={"Description should be at least 50 characters long."}
        />
        <button 
          onClick={saveDoctor}
        >SAVE DOCTOR</button>
    </div>
  )
}

export default DoctorInfoForm