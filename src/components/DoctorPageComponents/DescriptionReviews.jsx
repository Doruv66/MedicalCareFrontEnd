import { useEffect, useState } from 'react'
import style from './DescriptionReviews.module.css'
import ReviewCard from './ReviewCard';
import reviewsAPI from '../../API/ReviewsAPI';
const DescriptionReviews = ({doctor}) => {

  const [active, setActive] = useState(false);
  
  const [reviews, setReviews] = useState(null);

  const refreshReviews = (doctorid) => {
    reviewsAPI.getDoctorReviews(doctorid)
    .then((response) => {
      setReviews(response.data.reviews)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    refreshReviews(doctor.accountId);
  }, [])

  return (
    <div>
    {
      reviews !== null ? (
      <div className={style.content}>
        <div className={style.menu}>
          <p onClick={() => {
            setActive(false);
          }}>Description</p>
          <p className={style.review} onClick={() => {
            setActive(true);
          }}>Reviews</p>
        </div>
        <div className={active ? `${style.information} ${style.active}` : style.information}>
          <div className={`${style.content_box} ${style.description}`} >{doctor.description}</div>
          <div className={`${style.content_box} ${style.reviews}`} >
            {reviews.map((review) => {
              return (
                <ReviewCard key={review.reviewId} review={review}/>
              )
            })}
          </div>
        </div>
      </div>) : (
        <p>There are no reviews</p>
      )
    }
    </div>
  )
}

export default DescriptionReviews