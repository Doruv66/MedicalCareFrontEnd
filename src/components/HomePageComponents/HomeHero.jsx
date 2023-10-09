import React from 'react'
import styles from './HomeHero.module.css'
import gifImage from '../../assets/HomePage.gif'


const HomeHero = () => {
  return (
    <div className={styles.hero__banner}>
        <div className={styles.hero__text}>
            <p className={styles.hero__quote}>Welcome to St Anna Ziekenhuis, where your health is our priority.</p>
            <p className={styles.hero__para}>Whether you need to see a specialist, arrange a routine check-up, or have an urgent medical concern, our experienced team is ready to assist you. Book your appointment online today and take the first step towards a healthier, happier you.</p>
        </div>
        <div className={styles.hero__animation}>
            <img src={gifImage} alt="Home Page Giff" />
        </div>
    </div>
  )
}

export default HomeHero