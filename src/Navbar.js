import React, { useState, useEffect } from 'react'
import logo from './assets/logo.png'
import userAvatar from './assets/user_avatar.png'
import './Navbar.css'
function Navbar() {
    const [show, handleShow] = useState(false)
    useEffect(() => {
        window.addEventListener("scroll",()=>{
            
            if(window.scrollY>150) {
                handleShow(true)

            }
            else{
                handleShow(false)
            }
        })
        return () => {
            window.removeEventListener("scroll")
        }
    }, [])
    return (
        <div className={`navbar  ${show && "nav_black"}`}>
            <img className="logo" src={logo} alt="Logo"></img>
            <img className="user_avatar" src={userAvatar} alt="avatar"></img>

        </div>
    )
}

export default Navbar
