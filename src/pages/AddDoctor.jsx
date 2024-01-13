import React, { useState } from 'react'
import style from './AddDoctor.module.css'
import { useUser } from '../components/Context/UserContext'
import {ImageUpload} from '../components/AddDoctorComponents/ImageUpload';
import DoctorInfoForm from '../components/AddDoctorComponents/DoctorInfoForm';
import Error401 from '../components/ErrorComponents/Error401'

const AddDoctor = () => {
    const user = useUser();
    const [error, setError] = useState('');
    const [newDoctor, setNewDoctor] = useState({
        photo: '',
        firstName: '',
        lastName: '',
        description: '',
        username: '',
        email: '',
        password: '',
        specialization: '',
    });

    //api call for making the add doctor also dont forget to create the username for the doctor 

    const updateDoctorProperty = (propertyName, propertyValue) => {
      setNewDoctor(prevDoctor => ({
          ...prevDoctor, 
          [propertyName]: propertyValue // Update the specific property
      }));
    };

    if (user === null) {
        return <Error401 />;
    } else if (user.accountType !== "ADMIN") {
        return <Error401 />;
    }

  return (
    <div className={style.wrapper}>
        {/* on the left upload image component  */}
        <div>
          <ImageUpload 
            doctor={newDoctor}
            updateDoctor={updateDoctorProperty}          
          />
        </div>
        {/* on the right information form for doctor  */}
        <div>
          <DoctorInfoForm 
            doctor={newDoctor} 
            error={error}
            updateDoctor={updateDoctorProperty} 
            setError={value => setError(value)}
          />
        </div>
    </div>
  )
}

export default AddDoctor