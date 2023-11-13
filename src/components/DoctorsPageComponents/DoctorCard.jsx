import React from 'react'
import { useState, useEffect } from 'react'
import style from './DoctorCard.module.css'
import { CiLogin } from 'react-icons/ci'
import { AiTwotoneStar } from 'react-icons/ai'
import reviewsAPI from '../../API/ReviewsAPI'
import { useNavigate } from 'react-router-dom'

const DoctorCard = ({doctor}) => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [average, setAverage] = useState(0);

    const refreshAverage = (doctorid) => {
        reviewsAPI.getAverage(doctorid)
        .then((response) => {
            setAverage(response.data.averageReview);
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
      const importImage = async () => {
        const imageModule = await import(`../../assets/${doctor.photo}.png`);
        setImage(imageModule.default);
      };
  
      importImage();
      refreshAverage(doctor.accountId);
    }, [doctor.photo]);

  return (
    <div className={style.card}>
        <img src={ image } alt="doctor image" />
        <div className={style.name}>
            <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>
        </div>
        <div className={style.information}>
            <div>
                <p>{doctor.specialization}</p>
            </div>
            <div className={style.reviews}>
                <AiTwotoneStar className={style.star}/> 
                {average}
            </div>
        </div>
        <div className={style.btn}>
            <p>St Anna Ziekenhuis</p>
            <CiLogin 
            className={style.icon}
            onClick={() => {
                navigate(`/doctor/${doctor.accountId}`)
            }}/>
        </div>
    </div>
  )
}

export default DoctorCard