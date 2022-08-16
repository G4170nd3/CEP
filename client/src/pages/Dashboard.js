import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Dashboard.css'
import ProfileSection from '../layout/ProfileSection'
import ViewOrders from './ViewOrders'
import Lend from './Lend'
import Borrow from './Borrow'
import ContentLoader from "react-content-loader"

function Dashboard() {
    const { userData, getUserData } = useAuth()
    const [userAction, setUserAction] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getUserData()
    }, [])


    useEffect(() => {
        const pathName = window.location.pathname
        if (pathName === "/dashboard")
            setUserAction("vieworders")
        else
            setUserAction(pathName.split("/")[1])
    }, [userAction, window.location.pathname])

    return (
        <React.Fragment>
            <Helmet>
                <title>CEP | Dashboard</title>
            </Helmet>
            <div className='page-container dashboard-container'>
                <div className="header">
                    {/* <h1>DASHBOARD</h1> */}
                </div>
                {userData && !userData.verified && <div className="verify-now">Verify your email to start using the portal. Click here to verify.</div>}
                {userData ? <ProfileSection userData={userData} />
                    :
                    <ContentLoader
                        width={700}
                        height={320}
                        viewBox="0 0 700 300"
                        backgroundColor="#ddd"
                        foregroundColor="#ffcb74"
                        className='center-scr'
                    >
                        <rect x="4" y="8" rx="3" ry="3" width="7" height="288" />
                        <rect x="6" y="289" rx="3" ry="3" width="669" height="8" />
                        <rect x="670" y="9" rx="3" ry="3" width="6" height="285" />
                        <rect x="55" y="42" rx="16" ry="16" width="274" height="216" />
                        <rect x="412" y="113" rx="3" ry="3" width="102" height="7" />
                        <rect x="402" y="91" rx="3" ry="3" width="178" height="6" />
                        <rect x="405" y="139" rx="3" ry="3" width="178" height="6" />
                        <rect x="416" y="162" rx="3" ry="3" width="102" height="7" />
                        <rect x="405" y="189" rx="3" ry="3" width="178" height="6" />
                        <rect x="5" y="8" rx="3" ry="3" width="669" height="7" />
                        <rect x="406" y="223" rx="14" ry="14" width="72" height="32" />
                        <rect x="505" y="224" rx="14" ry="14" width="72" height="32" />
                        <rect x="376" y="41" rx="3" ry="3" width="231" height="29" />
                    </ContentLoader>

                }
                <div className="action-container">
                    {userAction === "vieworders" ?
                        <ViewOrders userData={userData} />
                        : <></>}
                    {userAction === "lend" ?
                        <Lend userData={userData} />
                        : <></>}
                    {userAction === "borrow" ?
                        <Borrow userData={userData} />
                        : <></>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default Dashboard