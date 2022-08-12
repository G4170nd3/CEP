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
                        speed={2}
                        width={340}
                        height={84}
                        viewBox="0 0 340 84"
                        backgroundColor="#fff"
                        foregroundColor="#FF416C"
                    >
                        <rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
                        <rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
                        <rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
                        <rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
                        <rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
                        <rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
                        <rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
                        <rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
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