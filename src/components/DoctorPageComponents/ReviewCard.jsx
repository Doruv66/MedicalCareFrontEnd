import React, { useEffect, useState } from 'react'
import style from './ReviewCard.module.css'
import accountsAPI from '../../API/AccountsAPI';
import { AiTwotoneStar } from 'react-icons/ai'

const ReviewCard = ({review}) => {
    
    const [account, setAccount] = useState(null);
    const [date, setDate] = useState(null);

    const refreshAccount = (id) => {
        accountsAPI.getAccount(id)
        .then((response) => {
            setAccount(response.data);
        })
        .catch((error) => console.log(error))
    }

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric'};
        return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
    }

    useEffect(() => {
        refreshAccount(review.user.accountId);
        setDate(formatDate(review.date));
    }, [])
    

  return (

    <div className={style.card}>
        {
            account !== null ? (
            <>
                <div className={style.title}>
                    <h4>{`${account.firstName} ${account.lastName}`}</h4>
                    <p>{date}</p>
                </div>
                <div className={style.grade}>
                    {
                        Array.from({ length: review.rating }, (value, index) => (
                            <AiTwotoneStar key={index} />
                          ))
                    }
                </div>
                <p className={style.review}>{review.comment}</p> 
             </>
            ) : ( 
                <p>No reviews found</p>
            )
        }
    </div>
  )
}

export default ReviewCard