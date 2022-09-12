import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios'
import { MD5 } from 'crypto-js';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [userData, setUserData] = useState()
    const [inventory, setInventory] = useState([{
        img: `https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41bcsEUR+7L._SL1000_.jpg`,
        name: "Trimmer",
        metadata: {
            brand: "Phillips",
        },
        desc: "This is a trimmer lol",
        price: 10,
        estValue: 100,
    },
    {
        img: `https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41bcsEUR+7L._SL1000_.jpg`,
        name: "Trimmer",
        metadata: {
            brand: "Phillips",
        },
        desc: "This is a trimmer lol",
        price: 10,
        estValue: 100,
    },
    {
        img: `https://m.media-amazon.com/images/W/WEBP_402378-T1/images/I/41bcsEUR+7L._SL1000_.jpg`,
        name: "Trimmer",
        metadata: {
            brand: "Phillips",
        },
        desc: "This is a trimmer lol",
        price: 10,
        estValue: 100,
    }])
    const [userNotifications, setNotifications] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function signup(userInput) {
        try {
            const { data } = await axios.post("/api/register", {
                regName: userInput.name,
                regPassword: userInput.password,
                regEmail: userInput.email,
            })

            console.log(data);
            if (data.statusCode == 500) {
                //success
                console.log(data);
                navigate("/dashboard")
                Cookies.set("user", MD5(data.data[0].email + Date.now()), { expires: 1 })
                setCurrentUser(Cookies.get("user"))
                return
            } else if (data.statusCode == 501) {
                //email already exists
                throw new Error(data.message);
            }
        } catch (error) {
            throw error
        }
    }

    async function login(userInput) {
        try {
            const { data } = await axios.post("/api/login", {
                loginEmail: userInput.email,
                loginPassword: userInput.password,
            })
            console.log(data);
            if (data.statusCode == 550) {
                //success
                console.log(data);
                navigate("/dashboard")
                setCurrentUser(Cookies.get("token"))
                getUserData(data.data[0].email)
                return;
            } else if (data.statusCode == 502) {
                //wrong password
                console.log(data);
                throw new Error(data.message);
            }
        } catch (error) {
            throw error
        }
    }

    async function logout() {
        try {
            // const { data } = await axios.post("/api/logout", {
            //     userEmail: userData.email
            // })
            // console.log(data);
            let data = { statusCode: 550 }
            if (data.statusCode == 550) {
                //success
                navigate("/")
                Cookies.remove("token")
                setCurrentUser(null)
                return;
            } else if (data.statusCode == 502) {
                //wrong password
                console.log(data);
                throw new Error(data.message);
            }
        } catch (error) {
            throw error
        }
    }

    async function sendOtp() {
        try {
            const { data } = await axios.post("/otp/send", { vemail: userData.email })
            alert(data.message)
        } catch (error) {
            console.log(error);
        }
    }

    async function verifyOtp(otp) {
        try {
            const { data } = await axios.post("/otp/verify", { otpVal: otp, vemail: userData.email })
            if (data.status === false) {
                alert(data.message)
                return false
            }
            else return true
        } catch (error) {
            console.log(error);
        }
    }

    async function updateProfie(input) {
        const profile = {
            username: userData.username,
            email: userData.email,
            name: userData.name,
            rollNum: input.rollNum,
            campus: input.branch,
            batch: input.batch,
            branch: input.branch,
            hostel: input.hostel,
            roomNum: input.roomNum
        }
        try {
            const { data } = await axios.post("/api/user/update", profile)
            console.log(data);
            if (data.statusCode == 550) {
                //success
                console.log(data);
                navigate("/dashboard")
                return;
            } else if (data.statusCode == 502) {
                //wrong password
                console.log(data);
                throw new Error(data.message);
            }
        } catch (error) {
            throw error
        }
    }

    async function getUserData(email) {
        try {
            const { data } = await axios.post("/api/user/details", {
                userEmail: email
            })
            setUserData(data.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function saveUserAd(adData) {
        try {
            const { data } = await axios.post("/user/ad/create", adData)
            return data
        } catch (error) {
            console.error(error);
        }
    }

    async function checkToken(token) {
        try {
            const { data } = await axios.post("/api/checkToken", { refreshToken: token })
            if (data.statusCode == 440) {
                getUserData(data.data)
                setCurrentUser(data.data)
                navigate("/dashboard")
            } else {
                logout()
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(Cookies.get("token"));
        if (Cookies.get("token")) {
            checkToken(Cookies.get("token"))
        }
    }, [currentUser])


    const value = {
        currentUser,
        userData,
        userNotifications,
        login,
        signup,
        logout,
        getUserData,
        updateProfie,
        saveUserAd,
        inventory,
        sendOtp,
        verifyOtp
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}