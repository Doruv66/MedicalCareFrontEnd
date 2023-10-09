import React, { useState } from 'react'
import style from './LoginSignUp.module.css'
import LoginInput from './LoginInput'
import { GrMail } from 'react-icons/gr'
import { BsLockFill } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'

const LoginSignUp = () => {
    const [active, setActive] = useState(true)
  return (
    <div className={active ? style.wrapper : `${style.wrapper} ${style.active}`}>
        <div className={`${style.form_box} ${style.login}`}>
            <form action="#">
                <h2>Login</h2>
                <LoginInput icon={ <BiUser/> } type={"text"} name={"Username"}/>
                <LoginInput icon={<BsLockFill/>} type={"password"} name={"Password"}/>
                <div className={style.remember_forgot}>
                    <label >
                        <input type="checkbox"/> 
                        Remeber me 
                    </label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type='submit' className={style.btn}>Login</button>
                <div className={style.login_register}>
                    <p>Don't have an account? 
                        <a href="#" className={style.register_link} onClick={() => {
                            setActive(!active);
                            console.log(active);
                        }}>
                            Register
                        </a>
                    </p>
                </div>
            </form>
        </div>

        <div className={`${style.form_box} ${style.register}`}>
            <form action="#">
                <h2>Register</h2>
                <LoginInput icon={ <BiUser/> } type={"text"} name={"Username"}/>
                <LoginInput icon={ <GrMail/> } type={"email"} name={"Email"}/>
                <LoginInput icon={<BsLockFill/>} type={"password"} name={"Password"}/>
                <div className={style.remember_forgot}>
                    <label >
                        <input type="checkbox"/> 
                        I Agree to the terms and conditions 
                    </label>
                </div>
                <button type='submit' className={style.btn}>Register</button>
                <div className={style.login_register}>
                    <p>Already have an account?  
                        <a href="#" className={style.login_link} onClick={() => {
                            setActive(!active);
                            console.log(active);
                        }}>
                            Login
                        </a>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default LoginSignUp