import React, { useState } from 'react'
import style from './AvailabilityPicker.module.css'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Toasts from '../Toasts/Toasts';
import timeSlotsAPI from '../../API/TimeSlotsAPI';
import { useUser } from '../Context/UserContext';

const AvailabilityPicker = () => {

    const [date, setDate] = useState(null);
    const user = useUser();

    const supplyAvailability = (availableDay) => {
        if(availableDay < new Date()) {
            Toasts.warn("You can't submit availability for previous dates");
            return;
        }

        timeSlotsAPI.generateTimeSlots({
            date: date,
            doctor: user
        })
        .then((res) => {
            Toasts.success("Availability submited with success");
            setDate(null);
        })
        .catch(() => Toasts.info("You already have submited availability for this day"))
    }

  return (
    <div className={style.wrapper}>
      <LocalizationProvider className={style.date_picker} dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    label="Availability"
                    onChange={(newValue) => setDate(newValue)}
                    sx={{
                    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': { border: '1px solid white' },                           
                    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },  
                    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { border: '2px solid white' },
                    "& .MuiSvgIcon-root": {color: "white"},
                    '& .MuiInputLabel-root': {color: "white"},
                    '& .MuiInputBase-input': {color: "white"},
                    }}
                />
            </DemoContainer>
        </LocalizationProvider> 
        {
            date !== null && <button 
                className={style.btn}
                onClick={() => supplyAvailability(date)}
            >Set Available</button>
        }
    </div>
  )
}

export default AvailabilityPicker
