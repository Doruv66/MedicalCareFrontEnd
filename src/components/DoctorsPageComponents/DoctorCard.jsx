import React from 'react'
import { useState, useEffect } from 'react'
import style from './DoctorCard.module.css'
import { FiArrowRightCircle } from 'react-icons/fi'
import { AiTwotoneStar } from 'react-icons/ai'
import reviewsAPI from '../../API/ReviewsAPI'

const DoctorCard = ({doctor}) => {
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
        refreshAverage(doctor.accountId);
    }, [])
    useEffect(() => {
      const importImage = async () => {
        const imageModule = await import(`../../assets/${doctor.photo}.png`);
        setImage(imageModule.default);
      };
  
      importImage();
    }, [doctor.photo]);

  return (
    <div className={style.card}>
        <img src={ image } alt="doctor image" />
        <div className={style.name}>
            <h3>{doctor.name} {doctor.fname}</h3>
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
            <FiArrowRightCircle />
        </div>
    </div>
  )
}

export default DoctorCard