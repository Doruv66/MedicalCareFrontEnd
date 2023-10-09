import React, { useState } from 'react'
import {FiChevronDown} from 'react-icons/fi'
import styles from './QuestionItem.module.css'

const QuestionItem = (props) => {
    const [active, setActive] = useState(true);
  return (
    <div className={active ? styles.section : styles.active}>
        <div className={styles.question}>
            <h3>{props.question}</h3>
            <FiChevronDown className={styles.down} onClick={() => {
                setActive(!active);
                console.log(active);
            }}/>
        </div>
        <div className={styles.answer}>
            <p>
                {props.answer}
            </p>
        </div>
    </div>
  )
}

export default QuestionItem