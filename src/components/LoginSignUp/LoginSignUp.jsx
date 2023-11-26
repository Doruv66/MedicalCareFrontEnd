import React, { useState } from 'react'
import style from './LoginSignUp.module.css'
import LoginInput from './LoginInput'
import { GrMail } from 'react-icons/gr'
import { BsLockFill } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { jwtDecode } from 'jwt-decode'
import Patient from './Patient'
import accountsAPI from '../../API/AccountsAPI'
import Login from './Login'
import loginAPI from '../../API/LoginAPI'
import { useNavigate } from 'react-router-dom'
import { useUpdateUser } from '../Context/UserContext'

const LoginSignUp = () => {
    const [active, setActive] = useState(true);
    const [errorMessageSignUp, setErrorMessageSignUp] = useState("");
    const [errorMessageLogin, setErrorMessageLogin] = useState("");
    const updateUser = useUpdateUser();
    const navigate = useNavigate();
    

    //send sign up request
    const handleSignUp = async (newaccount) => {
        if(validateUsername(Patient.username) && validateEmail(Patient.email) && validatePassword(Patient.password)) {
            try {
                const response = await accountsAPI.createPatient(newaccount);
                navigate("/login");
            } catch(error) {
                if(error.response.data === "USERNAME_ALREADY_EXISTS") {
                    setErrorMessageSignUp("This username is already used, please use another one")
                } else if(error.response.data === "EMAIL_ALREADY_EXISTS") {
                    setErrorMessageSignUp("This email is already used, please use another one")
                } else {
                    setErrorMessageSignUp(error.response.data);
                }
            }
        } else {
            setErrorMessageSignUp("Please complete the form with valid data");
        }
    }

    //send login request
    const handleLogin = async(login) => {
        if(validateUsername(Login.username) && validatePassword(login.password)) {
            try {
                const response = await loginAPI.login(login);
                const token = response.accessToken;
                if(token) {
                    localStorage.setItem('token', token);
                    if(token) {
                        const parsedToken = jwtDecode(token);
                        if(parsedToken && parsedToken.accountId) {
                            accountsAPI.getAccount(parsedToken.accountId)
                            .then(response => updateUser(response.data.account))
                            .catch(error => console.log(error))
                        }
                    }
                    navigate("/");
                }
            } catch (error) {
                if(error.response.data === "USERNAME_NOT_FOUND") {
                    setErrorMessageLogin("There is no user with provided username")
                } else if(error.response.data === "WRONG_PASSWORD") {
                    setErrorMessageLogin("Incorrect password!!!")
                } else {
                    setErrorMessageLogin(error.response.data);
                }
            }   
        } else {
            setErrorMessageLogin("provide valid data for login")
        }
    }

    //validators with regex
    const validateUsername = (value) => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        return usernameRegex.test(value);
    };
    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };
    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return passwordRegex.test(value);
    };
  return (
    <div className={active ? style.wrapper : `${style.wrapper} ${style.active}`}>
        <div className={`${style.form_box} ${style.login}`}>
                <h2>Login</h2>
                <LoginInput icon={ <BiUser/> } type={"text"} name={"Username"}  property={Login.username} setProperty={value => Login.username = value} validator={validateUsername} setError={setErrorMessageLogin} errorMessage={"Username should be alphanumeric and 3-20 characters long."}/>
                <LoginInput icon={<BsLockFill/>} type={"password"} name={"Password"} property={Login.password} setProperty={value => Login.password = value} validator={validatePassword} setError={setErrorMessageLogin} errorMessage={"Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."}/>
                <div className={style.remember_forgot}>
                    <label >
                        {errorMessageLogin}
                    </label>
                </div>
                <button type='submit' className={style.btn} onClick={() => handleLogin(Login)}>Login</button>
                <div className={style.login_register}>
                    <p>Don't have an account? 
                        <a className={style.register_link} onClick={() => {
                            setActive(!active);
                        }}>
                            Register
                        </a>
                    </p>
                </div>
        </div>
                        
        <div className={`${style.form_box} ${style.register}`}>
                <h2>Register</h2>
                <LoginInput icon={ <BiUser/> } type={"text"} name={"Username"} property={Patient.username} setProperty={value => Patient.username = value} validator={validateUsername} setError={setErrorMessageSignUp} errorMessage={"Username should be alphanumeric and 3-20 characters long."}/>
                <LoginInput icon={ <GrMail/> } type={"email"} name={"Email"} property={Patient.email} setProperty={value => Patient.email = value} validator={validateEmail} setError={setErrorMessageSignUp} errorMessage={"Invalid email format."}/>
                <LoginInput icon={<BsLockFill/>} type={"password"} name={"Password"} property={Patient.password} setProperty={value => Patient.password = value} validator={validatePassword} setError={setErrorMessageSignUp} errorMessage={"Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."}/>
                <div className={style.remember_forgot}>
                    <label >
                        {errorMessageSignUp}
                    </label>
                </div>
                <button type='submit' className={style.btn} onClick={() => {
                    handleSignUp(Patient);
                }}>Register</button>
                <div className={style.login_register}>
                    <p>Already have an account?  
                        <a className={style.login_link} onClick={() => {
                            setActive(!active);
                        }}>
                            Login
                        </a>
                    </p>
                </div>
        </div>
    </div>
  )
}

export default LoginSignUp;