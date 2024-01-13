import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from '../components/Context/UserContext';
import Toasts from '../components/Toasts/Toasts.jsx'

const Logout = () => {
    const navigate = useNavigate();
    const setUser = useUpdateUser();
    useEffect(() => {
        if(localStorage.getItem("token")) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            setUser(null);
            navigate("/");
            Toasts.info('Logged out') 
        } else {
            navigate("/")
        }
    }, []);
  return (
    <div></div>
  )
}

export default Logout