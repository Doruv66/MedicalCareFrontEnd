import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { useUser } from '../Context/UserContext';
import Toasts from '../Toasts/Toasts';
import reviewsAPI from '../../API/ReviewsAPI';
import { useNavigate } from 'react-router-dom';

const colors = {
    white: "#fff",
    grey: "#a9a9a9"
}

const LeaveReview = ({appointment}) => {
    const stars = Array(5).fill(0);
    const navigate = useNavigate();
    const user = useUser();
    const [hoverValue, setHoverValue] = useState(undefined);
    const [review, setReview] = useState({
        rating: 0,
        comment: '',
        patient: user,
        date: new Date(),
        doctor: appointment.doctor,
        appointment: appointment
    });

    const handleCommentChange = value => {
        setReview(prevState => ({
            ...prevState,
            comment: value
        }))
    }

    const handleRatingChange = value => {
        setReview(prevState => ({
            ...prevState,
            rating: value
        }))
    }

    const handleMouseHover = value => {
        setHoverValue(value);
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined);
    }

    const createReview = (request) => {
        if(request.rating !== 0 && request.comment !== '') {
            reviewsAPI.createReview(request)
            .then(response => console.log(response))
            .catch(error => console.log(error))
            Toasts.success("Thank you for your review");
            navigate("/");
        } else {
            Toasts.warn("Please complete the review with valid data ")
        }
    }

  return (
    <div style={styles.container}>
        <h3>Leave a review </h3>
        <div style={styles.stars}>
            {stars.map((_, index) => {
                return (
                    <FaStar 
                        key={index} 
                        style={{
                            marginRight: "10px",
                            cursor: "pointer",
                        }}
                        color={(hoverValue || review.rating) > index ? colors.white : colors.grey}
                        onClick={() => handleRatingChange(index+1)}
                        onMouseLeave={handleMouseLeave}
                        onMouseOver={() => {handleMouseHover(index + 1)}}
                    />
                )
            })}
        </div>
        <textarea placeholder='How was your experience'
        style={styles.textarea}
        onChange={e => handleCommentChange(e.target.value)}>
        </textarea>
        <button style={styles.btn} onClick={() => createReview(review)}>Submit</button>
    </div>
  )
}
const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        border: '2px solid rgba(255, 255, 255, 0.5)',
        borderRadius: '15px',
        backdropFilter: 'blur(50px)',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
        width: '350px',
        marginBottom: '15px',
        padding: '10px'
    },
    btn: {
        marginTop: '15px',
        backgroundColor: '#fff',
        border: 'none',
        outline: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: "900",
        width: '100px',
        color: '#000000',
    },
    textarea: {
        marginTop: '15px',
        backgroundColor: 'transparent',
        width: '291px',
        borderRadius: '4px',
        maxWidth: '300px',
        maxHeight: '100px',
        height: '67px',
        color: '#fff',
    },
}

export default LeaveReview