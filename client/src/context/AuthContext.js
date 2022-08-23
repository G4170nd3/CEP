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
    const [userOrders, setUserOrders] = useState()
    const [inventory, setInventory] = useState({
        name: "Trimmer",
        metadata: {
            brand: "Phillips",
        },
        price: 10,
        estValue: 100,
    })
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
                return;
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

    async function getUserData() {
        setTimeout(() => {
            setUserData({
                username: "akarsh1278.be20",
                email: "akarsh1278.be20@chitkarauniversity.edu.in",
                name: "AKARSH TRIPATHI",
                rollNum: 2011981278,
                campus: "HP",
                batch: 2020,
                branch: "CSE",
                hostel: "Bose",
                roomNum: 224,
                isVerified: false,
                isComplete: false
            })
        }, 1000);
    }

    async function getUserOrders(uid) {
        setTimeout(() => {
            setUserOrders([
                {
                    orderId: "cuhp20xx",
                    itemId: "123",
                    borrowerId: "2011981xxxx",
                    lenderId: "",
                    transactionAmount: 10,
                    dateOfTransaction: new Date().toLocaleString(),
                    itemDetails: {
                        itemName: "Trimmer",
                        metadata: {
                            brand: "Phillips",
                            postCreated: "",
                            lenderId: "201198xxxx",
                        },
                        desc: "Lorem ipsum",
                        imgUrl: "",
                        price: 10,
                        estValue: 100,
                    }
                },
                {
                    orderId: "cuhp20xx",
                    itemId: "123",
                    borrowerId: "2011981xxxx",
                    lenderId: "",
                    transactionAmount: 15,
                    dateOfTransaction: new Date().toLocaleString(),
                    itemDetails: {
                        itemName: "Kettle",
                        metadata: {
                            brand: "Omega",
                            postCreated: "",
                            lenderId: "201198xxxx",
                        },
                        desc: "Lorem ipsum",
                        imgUrl: "",
                        price: 15,
                        estValue: 1000,
                    }
                },
                {
                    orderId: "cuhp20xx",
                    itemId: "123",
                    borrowerId: "2011981xxxx",
                    lenderId: "",
                    transactionAmount: 8,
                    dateOfTransaction: new Date().toLocaleString(),
                    itemDetails: {
                        itemName: "Iron",
                        metadata: {
                            brand: "Bajaj",
                            postCreated: "",
                            lenderId: "201198xxxx",
                        },
                        desc: "Lorem ipsum",
                        imgUrl: "",
                        price: 8,
                        estValue: 100,
                    }
                }
            ])
        }, 5000);
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
        userOrders,
        getUserOrders,
        updateProfie
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}