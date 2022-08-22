import React, { useEffect, useState } from 'react'
import './AuthUserGateway.css'
import Helmet from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {

    const [userInput, setUserInput] = useState({})
    const navigate = useNavigate()
    const { currentUser, login, signup } = useAuth()

    /*
    userInput = {
        name: "",
        email: "",
        password: ""
    }
    OR
    userInput = {
        email: "",
        password: ""
    }
    */

    const [pageState, setPageState] = useState("login")

    const handleSignup = async (e) => {
        e.preventDefault()
        if (userInput.name == "" || userInput.name == undefined) {
            alert("Invalid name")
            return
        }
        if (userInput.email == "" || userInput.email == undefined) {
            alert("Invalid email")
            return
        }
        if (userInput.password == "" || userInput.password == undefined) {
            alert("Invalid password")
            return
        }
        try {
            await signup(userInput)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (userInput.email == "" || userInput.email == undefined) {
            alert("Invalid email")
            return
        }
        if (userInput.password == "" || userInput.password == undefined) {
            alert("Invalid password")
            return
        }
        // console.log(userInput.email, userInput.password)
        try {
            await login(userInput)
        } catch (error) {
            document.getElementById("message").innerHTML = error.message
        }
    }

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUserInput((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        })
    }

    useEffect(() => {
      if(currentUser) {
        navigate("/dashboard")
      }
    }, [currentUser])
    

    return (
        <React.Fragment>
            <Helmet>
                <title>CEP | {pageState === "login" ? "Login" : "Sign Up"}</title>
            </Helmet>
            <div className='page-container auth-user-gateway-container'>
                <div className="container" id="container">
                    <p id="message"></p>
                    <div className="form-container sign-up-container">
                        <form onSubmit={handleSignup}>
                            <h1>Create Account</h1>
                            <span>Use your college email for registration</span>
                            <input type="text" name='name' id='name-signup' placeholder="Name" onChange={handleInput} />
                            <input type="email" name='email' id='email-signup' placeholder="Email" onChange={handleInput} />
                            <input type="password" name='password' id='password-signup' placeholder="Password" onChange={handleInput} />
                            <p className='mobile-gateway-mode-switch' onClick={() => { document.getElementById('container').classList.remove("right-panel-active"); setPageState("login"); setUserInput({}) }}>Already registered? Login</p>
                            <button>Sign Up</button>
                        </form>
                    </div>
                    <div className="form-container sign-in-container">
                        <form onSubmit={handleLogin}>
                            <h1>Sign in</h1>
                            <span>Use your college email to sign-in</span>
                            <input type="email" name='email' id='email-signin' placeholder="Email" onChange={handleInput} />
                            <input type="password" name='password' id='password-signin' placeholder="Password" onChange={handleInput} />
                            {/* <a href="#">Forgot your password?</a> */}
                            <p className='mobile-gateway-mode-switch' onClick={() => { document.getElementById('container').classList.add("right-panel-active"); setPageState("signup"); setUserInput({}) }}>Not registered? Signup</p>
                            <button>Sign In</button>
                        </form>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left">
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <p>Already registered?</p>
                                <button className="ghost" id="signIn" onClick={() => { document.getElementById('container').classList.remove("right-panel-active"); setPageState("login"); setUserInput({}) }}>Sign In</button>
                            </div>
                            <div className="overlay-panel overlay-right">
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <p>Not registered yet? Signup today!</p>
                                <button className="ghost" id="signUp" onClick={() => { document.getElementById('container').classList.add("right-panel-active"); setPageState("signup"); setUserInput({}) }}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login