import React, { useEffect, useState } from 'react'
import './Navbar.css'
import hamburger from '../assets/icons/hamburger-menu.svg'
import hamburgerDark from '../assets/icons/hamburger-menu-dark.svg'
import navigatorIcon from '../assets/icons/navigator-icon.png'
import navigatorIconDark from '../assets/icons/navigator-icon-dark.png'
import backIcon from '../assets/icons/back.png'
import backIconDark from '../assets/icons/back-dark.png'
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

function Navbar() {

  const [navState, setNavState] = useState(false)
  const [screenWidth, setScreenWidth] = useState()
  const [dropdown, toggleDropdown] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { currentUser, userData, logout } = useAuth()


  function solidifyNav(navState) {
    const nav = document.getElementsByClassName("nav-container")[0]
    const loginBtn = document.getElementsByClassName("nav-tab-btn")[0]
    const navTabs = document.getElementsByClassName("nav-tab")
    if (navState) {
      nav.style.backgroundColor = "var(--c3)"
      nav.style.color = "var(--c1)"
      for (let i = 0; i < navTabs.length; i++) {
        navTabs[i].classList.remove("nav-tab-hover-dark")
        navTabs[i].classList.add("nav-tab-hover")
      }
      loginBtn.style.borderColor = "var(--c1)"
      loginBtn.style.boxShadow = "inset 0 0 0 0 var(--c1)"
      loginBtn.classList.remove("nav-tab-btn-hover-dark")
      loginBtn.classList.add("nav-tab-hover-btn")
    } else {
      nav.style.backgroundColor = "var(--c1)"
      nav.style.color = "var(--c3)"
      for (let i = 0; i < navTabs.length; i++) {
        navTabs[i].classList.remove("nav-tab-hover")
        navTabs[i].classList.add("nav-tab-hover-dark")
      }
      loginBtn.style.borderColor = "var(--c3)"
      loginBtn.classList.remove("nav-tab-hover-btn")
      loginBtn.classList.add("nav-tab-btn-hover-dark")
    }
  }

  function toggleNavigator() {
    const navigator = document.getElementsByClassName("navigator-container")[0]
    if (navigator.style.marginLeft === "0vw") {
      navigator.style.marginLeft = "-100vw"
      document.getElementById("navigator-icon").src = navState ? navigatorIconDark : navigatorIcon
    }
    else {
      navigator.style.marginLeft = "0vw"
      document.getElementById("navigator-icon").src = navState ? backIconDark : backIcon
    }
  }

  function openMobileMenu() {
    const menu = document.getElementsByClassName("nav-tabs-container-mobile")[0]
    menu.style.marginLeft = "0vw"
  }

  function closeMobileMenu() {
    const menu = document.getElementsByClassName("nav-tabs-container-mobile")[0]
    menu.style.marginLeft = "-200vw"
  }

  useEffect(() => {
    setLoading(true)
    setScreenWidth(window.innerWidth)
    document.addEventListener("scroll", () => {
      let scrollPosition = window.pageYOffset || window.scrollY || document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollPosition > 0) {
        solidifyNav(false)
        setNavState(true)
      } else {
        solidifyNav(true)
        setNavState(false)
      }
    })
    if (userData) {
      setLoading(false)
    }
  }, [screenWidth, currentUser, userData])


  return (
    <div className='nav-container'>
      <div className="nav-icon-container">
        <img src={navState ? hamburgerDark : hamburger} alt="" id="hamburger" onClick={openMobileMenu} />
      </div>
      <div className="nav-title">
        <h1 onClick={() => { navigate("/") }}>Chitkara Exchange Portal</h1><div className='campus-subtext'>{userData && userData.campus}</div>
      </div>
      <ul className={screenWidth > 665 ? "nav-tabs-container" : "nav-tabs-container-mobile"}>
        <li id="close-mobile-menu" onClick={closeMobileMenu}>X</li>
        <li className="nav-tab nav-tab-hover" onClick={() => { navigate("/") }}>Home</li>
        {/* <li className="nav-tab nav-tab-hover">Products</li> */}
        <li className="nav-tab nav-tab-hover">About</li> 
        <li className="nav-tab-btn nav-tab-btn-hover" onClick={userData ? logout : ()=>{}}>{currentUser ? loading ? <>Loading...</> : userData ? `${userData.name}` : "" : "Login"}</li>
      </ul>
    </div >
  )
}

export default Navbar