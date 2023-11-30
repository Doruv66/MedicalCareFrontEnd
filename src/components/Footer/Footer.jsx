import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
    const content = [
        {
            name: "Contact Information",
            content1: "+3148932848",
            content2: "stanna@hotmail.com",
            content3: "Antoon Coolenlaan 1"
        },
        {
            name: "About Us",
            content1: "History",
            content2: "Mission Values",
            content3: "Awards and Recognition"
        },
        {
            name: "Services",
            content1: "Primary Services",
            content2: "Advanced Treatments",
            content3: "Comprehensive Care"
        },
        {
            name: "Patient Resources",
            content1: "Educational Materials",
            content2: "Downloadable Forms",
            content3: "Insurance Information"
        },
    ];


    return (
        <footer>
            {content.map((contentItem, index) => (
                <div className={styles.footer_col} key={index}>
                    <h4>{contentItem.name}</h4>
                    <ul>
                        <li><a>{contentItem.content1}</a></li>
                        <li><a>{contentItem.content2}</a></li>
                        <li><a>{contentItem.content3}</a></li>
                    </ul>
                </div>
            ))}
        </footer>
    );
};

export default Footer;
