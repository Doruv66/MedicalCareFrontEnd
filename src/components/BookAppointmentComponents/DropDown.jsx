import React, { useState } from 'react'
import style from './DropDown.module.css'
import {FiChevronDown} from 'react-icons/fi'

const DropDown = (props) => {
    const [active, setActive] = useState(false);
  return (
    <div className={active ? `${style.dropdown} ${style.active}` : style.dropdown} onClick={() => {
            setActive(!active);
        }}>
        <input type="text" className={style.textbox} 
        placeholder={props.placeholder} value={props.date !== null ? props.date : ''} readOnly/>
        <FiChevronDown className={style.icon}/>
        <div className={style.option}>
            {props.data !== null ? (props.data.map((date, index) => (
            <div key={index} onClick={() => props.setDate(date)}>
                {date}
            </div>
            ))) :  (
                <div>Nothing Available </div>
            )
            }
        </div>
    </div>
  )
}

export default DropDown