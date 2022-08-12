import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/Dashboard.css'
import MD5 from 'crypto-js/md5'

function ProfileSection(props) {

    const navigate = useNavigate()

    useEffect(() => {
        props.userData.dpUrl = `https://www.gravatar.com/avatar/${MD5(props.userData.email)}?d=retro`
        console.log(props.userData.dpUrl);
    }, [])

    function viewOrders() {
        navigate("/vieworders")
    }

    function lend() {
        navigate("/lend")
    }

    function borrow() {
        navigate("/borrow")
    }

    return (
        <div>
            <div className="profile-section">
                <div className="user-details paper white">

                    <div class="top-tape"></div>
                    <div className="user-avatar">
                        {props.userData && <img src="https://www.gravatar.com/avatar/242600846a716588f455fbb330e2d035?d=retro&&r=x" />}
                    </div>
                    <div className="user-info">
                        <h2>{props.userData.name}</h2>
                        <div className='user-enrollment'>
                            <div id="batch">University ID: {props.userData && props.userData.rollNum}</div>
                            {props.userData && props.userData.campus && <div id="batch">Campus: {props.userData.campus}</div>}
                            {props.userData && props.userData.branch && <div id="batch">Branch: {props.userData.branch}</div>}
                            {props.userData && props.userData.batch && <div id="batch">Batch: {props.userData.batch}</div>}
                            {props.userData && props.userData.hostel && <div id="batch">Hostel: {props.userData.hostel}</div>}
                            {props.userData && props.userData.roomNum && <div id="batch">Room Number: {props.userData.roomNum}</div>}

                        </div>
                    </div>
                </div>
                <div className="user-profile-actions">
                    <button className="button-82-pushable" role="button" onClick={viewOrders}>
                        <span className="button-82-shadow"></span>
                        <span className="button-82-edge"></span>
                        <span className="button-82-front text">
                            View Orders
                        </span>
                    </button>
                    <button className="button-82-pushable" role="button" onClick={lend}>
                        <span className="button-82-shadow"></span>
                        <span className="button-82-edge"></span>
                        <span className="button-82-front text">
                            Lend
                        </span>
                    </button>
                    <button className="button-82-pushable" role="button" onClick={borrow}>
                        <span className="button-82-shadow"></span>
                        <span className="button-82-edge"></span>
                        <span className="button-82-front text">
                            Borrow
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileSection