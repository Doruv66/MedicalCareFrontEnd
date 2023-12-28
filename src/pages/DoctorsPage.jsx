import React, { useEffect, useState } from 'react'
import style from './DoctorsPage.module.css'
import DoctorsHero from '../components/DoctorsPageComponents/DoctorsHero'
import SearchBar from '../components/DoctorsPageComponents/SearchBar'
import DoctorCard from '../components/DoctorsPageComponents/DoctorCard'
import AccountsAPI from '../API/AccountsAPI'
import { useUser } from '../components/Context/UserContext'
import { useNavigate } from 'react-router-dom'

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const user = useUser();

  const refreshDoctorsByKeyword = (keyword) => {
    AccountsAPI.getDoctorsByKeyword(keyword)
      .then((response) => {
        setDoctors(Object.values(response.data.accounts))
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (keyword === '') {
      AccountsAPI.getDoctors()
        .then((response) => {
          setDoctors(Object.values(response.data.accounts))
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      refreshDoctorsByKeyword(keyword);
    }
  }, [keyword]);

  return (
       <div className={style.doctor_content}>
          <DoctorsHero />
          <div className={style.header_content}>
            <SearchBar setKeyword={setKeyword} keyword={keyword}/>
            {
              user !== null && user.accountType === "ADMIN" 
              && <button 
                className={style.btn}
                onClick={() => navigate("/adddoctor")}
              >ADD DOCTOR</button>
            }
          </div>
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
                <h1>Nothing found</h1>
              )
            }
          </ul>
        </div>
  )
}

export default DoctorsPage