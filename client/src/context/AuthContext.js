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
                Cookies.set("user", MD5(data.data[0].email + Date.now()), { expires: 1 })
                setCurrentUser(Cookies.get("user"))
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
                Cookies.remove("user")
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
            console.log(data);
            setUserData(data.data[0]);
        } catch (error) {
            console.error(error);
        }
    }

    async function saveUserAd(adData) {
        try {
            const { data } = await axios.post("/user/createad", adData)
            return data
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        setCurrentUser(Cookies.get("user"))
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
        inventory
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}