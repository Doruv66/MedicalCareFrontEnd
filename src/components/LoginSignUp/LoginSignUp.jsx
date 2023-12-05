import React, { useState } from 'react'
import style from './LoginSignUp.module.css'
import LoginInput from './LoginInput'
import { GrMail } from 'react-icons/gr'
import { BsLockFill } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { jwtDecode } from 'jwt-decode'
import Patient from './Patient'
import accountsAPI from '../../API/AccountsAPI'
import Login from './Login'
import userValidators from '../Validators/UserValidators'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import loginAPI from '../../API/LoginAPI'
import { useNavigate } from 'react-router-dom'
import { useUpdateUser } from '../Context/UserContext'
import Toasts from '../Toasts/Toasts'
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaFileSignature } from "react-icons/fa6";;

const LoginSignUp = () => {
    const [active, setActive] = useState(true);
    const [errorMessageSignUp, setErrorMessageSignUp] = useState("");
    const [errorMessageLogin, setErrorMessageLogin] = useState("");
    const updateUser = useUpdateUser();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState(Login); 
    const [patientData, setPatientData] = useState(Patient); 

    const handleLoginChange = (key, value) => {
        setLoginData({ ...loginData, [key]: value });
      };
    
      const handlePatientChange = (key, value) => {
        setPatientData({ ...patientData, [key]: value });
      };
    

    //send sign up request
    const handleSignUp = async (newaccount) => {
        if(userValidators.validateUsername(newaccount.username) && userValidators.validateEmail(newaccount.email) && userValidators.validatePassword(newaccount.password) && userValidators.validateLastName(newaccount.lastName) && userValidators.validateName(newaccount.firstName) && newaccount.dateOfBirth !== null) {
            try {
                const response = await accountsAPI.createPatient(newaccount);
                Login.username = newaccount.username;
                Login.password = newaccount.password;
                handleLogin({username: newaccount.username, password: newaccount.password})
                Toasts.success('Account created with success');
            } catch(error) {
                if(error.response.data === "USERNAME_ALREADY_EXISTS") {
                    Toast.warn("This username is already used, please use another one")
                } else if(error.response.data === "EMAIL_ALREADY_EXISTS") {
                    Toasts.warn("This email is already used, please use another one")
                } else {
                    setErrorMessageSignUp(error.response.data);
                }
            }
        } else {
            Toasts.warn("Please complete the form with valid data");
        }
    }

    //send login request
    const handleLogin = async(login) => {
        if(userValidators.validateUsername(login.username) && userValidators.validatePassword(login.password)) {
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
                    Toasts.success('Logged in succesfuly');
                }
            } catch (error) {
                if(error.response.data === "USERNAME_NOT_FOUND") {
                    Toasts.error("There is no user with provided username")
                } else if(error.response.data === "WRONG_PASSWORD") {
                    Toasts.error("This combination of password and username is not correct")
                } else {
                    setErrorMessageLogin(error.response.data);
                }
            }   
        } else {
            Toasts.warn("Provide valid data for login")
        }
    }

return (
    <div className={active ? style.wrapper : `${style.wrapper} ${style.active}`}>
        <div className={`${style.form_box} ${style.login}`}>
                <h2>Login</h2>
                <div style={{ marginTop: '50px' }}>
                    <LoginInput
                        icon={<BiUser />}
                        type={'text'}
                        name={'Username'}
                        property={loginData.username}
                        setProperty={(value) => handleLoginChange('username', value)} 
                        validator={userValidators.validateUsername}
                        setError={setErrorMessageLogin}
                        errorMessage={'Username should be alphanumeric and 3-20 characters long.'}
                        style={{ marginTop: '30px' }}
                    />
                    </div>
                    <div style={{ marginTop: '50px', marginBottom: '10px' }}>
                    <LoginInput
                        icon={<BsLockFill />}
                        type={'password'}
                        name={'Password'}
                        property={loginData.password}
                        setProperty={(value) => handleLoginChange('password', value)} 
                        validator={userValidators.validatePassword}
                        setError={setErrorMessageLogin}
                        errorMessage={'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'}
                        style={{ marginTop: '30px' }}
                    />
                </div>
                <div className={style.remember_forgot}>
                    <label >
                        {errorMessageLogin}
                    </label>
                </div>
                <button type='submit' className={style.btn} onClick={() => handleLogin(loginData)}>Login</button>
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
                <LoginInput 
                    icon={ <BiUser/> } 
                    type={"text"} 
                    name={"Username"} 
                    property={Patient.username} 
                    setProperty={value => handlePatientChange('username', value)} 
                    validator={userValidators.validateUsername} 
                    setError={setErrorMessageSignUp} 
                    errorMessage={"Username should be alphanumeric and 3-20 characters long."}
                />
                <LoginInput 
                    icon={ <GrMail/> } 
                    type={"email"} 
                    name={"Email"} 
                    property={Patient.email} 
                    setProperty={value => handlePatientChange('email', value)} 
                    validator={userValidators.validateEmail} 
                    setError={setErrorMessageSignUp} 
                    errorMessage={"Invalid email format."}
                />
                <LoginInput 
                    icon={<BsLockFill/>} 
                    type={"password"} 
                    name={"Password"} 
                    property={Patient.password} 
                    setProperty={value => handlePatientChange('password', value)} 
                    validator={userValidators.validatePassword} 
                    setError={setErrorMessageSignUp} errorMessage={"Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."}
                />
                <LoginInput 
                    icon={<BsFillPersonVcardFill />} 
                    type={"text"} name={"First Name"} 
                    property={Patient.firstName} 
                    setProperty={value => handlePatientChange('firstName', value)} 
                    validator={userValidators.validateName} 
                    setError={setErrorMessageSignUp} 
                    errorMessage={'Field should contain only letters.'} 
                />
                <LoginInput 
                    icon={<FaFileSignature />} 
                    type={"text"} 
                    name={"Last Name"} 
                    property={Patient.lastName} 
                    setProperty={value => handlePatientChange('lastName', value)} 
                    validator={userValidators.validateLastName} 
                    setError={setErrorMessageSignUp} 
                    errorMessage={'Field should contain only letters.'} 
                />
                <LocalizationProvider className={style.date_picker} dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            label="Birth Date"
                            onChange={(newValue) => handlePatientChange('dateOfBirth', newValue)}
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
                <div className={style.remember_forgot} style={{marginTop: "15px"}}>
                    <label >
                        {errorMessageSignUp}
                    </label>
                </div>
                <button type='submit' className={style.btn} onClick={() => {
                    handleSignUp(patientData);
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