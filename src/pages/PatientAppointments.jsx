import React, { useEffect, useState } from 'react'
import style from './PatientAppointments.module.css'
import { useUser } from '../components/Context/UserContext'
import { useNavigate } from 'react-router-dom';
import PatientCard from '../components/PatientAppointments/PatientCard';
import appointmentsAPI from '../API/AppointmentsAPI';
import AppointmentCard from '../components/PatientAppointments/AppointmentCard';

const PatientAppointments = () => {
    const user = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState({
      upcoming: [],
      previous: []
    })

    const refreshUpcoming = (id) => {
      appointmentsAPI.getUpcomingAppointments(id)
      .then((response) => {
        setAppointments(prevState => ({
        ...prevState,
        upcoming: response.data.appointments
      }))})
      .catch(error => console.log(error));
    }

    const refreshPrevious = (id) => {
      appointmentsAPI.getPreviousAppointments(id)
      .then((response) => {
        setAppointments(prevState => ({
        ...prevState,
        previous: response.data.appointments
      }))})
      .catch(error => console.log(error))
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        if (!user && loading) {
          navigate("/login");
        } else {
          refreshPrevious(user.accountId);
          refreshUpcoming(user.accountId);
          setLoading(false);
        }
      }, 50); 
      console.log(appointments)
      return () => clearTimeout(timer);
    
  }, [user, loading, navigate]);

  return (
    <>
          {loading ? (
                      <div>Loading...</div>
          ) : (
            <div className={style.wrapper}>
                <div className={style.patient_card}>
                    <PatientCard user={user} />
                </div>
                <div className={style.appointments}>
                    <h1>Your Appointments </h1>
                    {
                        appointments.upcoming.length > 0 && 
                        <>
                          <h2>Upcoming Appointments:</h2>
                          <div className={style.upcoming}>
                            {appointments.upcoming.map(appointment => <AppointmentCard 
                            appointment={appointment} 
                            previous={false}
                            key={appointment.appointmentId}/>)}
                          </div>
                        </>
                    }
                    {
                      appointments.previous.length > 0 && 
                      <>
                        <h2>Previous Appointments:</h2>
                        <div className={style.previous}>
                          {appointments.previous.map(appointment => <AppointmentCard 
                          appointment={appointment} 
                          previous={true}
                          key={appointment.appointmentId}/>)}
                        </div>
                      </>
                    }
                    
                    {!appointments.upcoming.length && !appointments.previous.length && (
                        <p>No appointments yet.</p>
                    )}
                </div>
            </div>
          )}
    </>
          
  )
}

export default PatientAppointments