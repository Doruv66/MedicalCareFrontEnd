import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css"
import Hamburger from 'hamburger-react'

function NavBar() {
    const [active, setActive] = useState(false)
    const toggle = () => {
        setActive(!active);
        console.log(active);
    }

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
        },
        {
            id: 3,
            path: "/services",
            text: "Services"
        },
        {
            id: 4,
            path: "/contact",
            text: "Contact Us"
        }
    ]

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