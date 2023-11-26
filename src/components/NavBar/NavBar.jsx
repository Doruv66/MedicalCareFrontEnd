import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"
import Hamburger from 'hamburger-react'
import { useUser } from "../Context/UserContext";

function NavBar() {
    const [active, setActive] = useState(false);
    const user = useUser();

    const toggle = () => {
        setActive(!active);
    };

    const links = [
        {
            id: 1,
            path: "/",
            text: "Home"
        },
        {
            id: 2,
            path: "/doctors",
            text: "Find A Doctor"
        }
    ]

    if(user !== null){
    switch(user.accountType) {
        case "PATIENT":
            links.push({
                id: 6,
                path: "/patientappointments",
                text: "Appointments"
            }, {
                id: 4,
                path: "/profile",
                text: user.username
            })
            break;
        case "DOCTOR":
            links.push({
                id: 7,
                path: "/schedule",
                text: "Schedule"
            })
            break;
        case "ADMIN":
            links.push({
                id: 8,
                path: "/dashboard",
                text: "Dashboard"
            })
            break;
    }
    links.push({
        id: 5,
        path: "/logout",
        text: "Logout"
    })
}else{ links.push({
        id: 3,
        path: "/login",
        text: "Login"
    }) 
}
  

    return (
        <header className={styles.header}>
            <a className={styles.logo}>MedicalCare</a>
            <label className={styles.icon}>
                <Hamburger onToggle={toggle}/>
            </label>
            <nav className={active ? styles.navbar : styles.active}>
                {links.map(link => {
                    return (
                        <NavLink to={link.path} key={link.id}>
                            {link.text}
                        </NavLink>
                    )
                })}
            </nav>
        </header>
    )
}

export default NavBar;