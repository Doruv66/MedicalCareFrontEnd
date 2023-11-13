import React, { useEffect, useState } from 'react'
import style from './DoctorWelcomeCard.module.css'
import { AiTwotoneStar } from 'react-icons/ai'
import reviewsAPI from '../../API/ReviewsAPI'

const DoctorWelcomeCard = ({doctor}) => {
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
  }, [])

  return (
    <div className={style.doctor_card}>
      <div className={style.image}>
        <img src={image} alt="" />
      </div>
      <div>
      <div className={style.information}>
            <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>
            <div>
                <p>{doctor.specialization}</p>
            </div>
            <div className={style.reviews}>
                <AiTwotoneStar className={style.star}/> 
                {average}
            </div>
            <p>Specialization in {doctor.specialization}</p>
        </div>
      </div>
    </div>
  )
}

export default DoctorWelcomeCard