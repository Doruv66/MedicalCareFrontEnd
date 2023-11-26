import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUpdateUser } from '../components/Context/UserContext';

const Logout = () => {
    const navigate = useNavigate();
    const setUser = useUpdateUser();
    useEffect(() => {
        if(localStorage.getItem("token")) {
            localStorage.removeItem("token");
            setUser(null);
            navigate("/");
        } else {
            navigate("/")
        }
    }, []);
  return (
    <div></div>
  )
}

export default Logout