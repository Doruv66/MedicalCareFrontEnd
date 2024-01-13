import React, { useState, useEffect, useRef } from 'react';
import style from './DoctorCard.module.css';
import { CiLogin } from 'react-icons/ci';
import { AiTwotoneStar } from 'react-icons/ai';
import reviewsAPI from '../../API/ReviewsAPI';
import { useNavigate } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  const [average, setAverage] = useState(0);
  const cardRef = useRef(null);

  const refreshAverage = (doctorid) => {
    reviewsAPI.getAverage(doctorid)
      .then((response) => {
        setAverage(response.data.averageReview);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    refreshAverage(doctor.accountId);

    if (cardRef.current) {
      VanillaTilt.init(cardRef.current, {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
      });
    }

    return () => {
      if (cardRef.current) {
        cardRef.current.vanillaTilt.destroy();
      }
    };
  }, [doctor.photo]);

  return (
    <div className={style.card} ref={cardRef}>
      <img src={doctor.photo} alt="doctor image" />
      <div className={style.name}>
        <h3>Dr. {doctor.firstName} {doctor.lastName}</h3>
      </div>
      <div className={style.information}>
        <div>
          <p>{doctor.specialization}</p>
        </div>
        <div className={style.reviews}>
          <AiTwotoneStar className={style.star} />
          {average ? average.toFixed(1) : "-"}
        </div>
      </div>
      <div className={style.btn}>
        <p>St Anna Ziekenhuis</p>
        <CiLogin
          className={style.icon}
          onClick={() => {
            navigate(`/doctors/${doctor.accountId}`);
          }}
        />
      </div>
    </div>
  );
};

export default DoctorCard;