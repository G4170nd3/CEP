import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/Dashboard.css'
import './ProfileSection.css'
import pencilIcon from '../assets/icons/pencil.png'
import MD5 from 'crypto-js/md5'
import { Helmet } from 'react-helmet'
import { useAuth } from '../context/AuthContext'

function ProfileSection(props) {

    const navigate = useNavigate()
    const [editProfile, toggleEditProfile] = useState(false)
    const [editProfileInput, setEditProfileInput] = useState()
    const [disableOtpReq, setDisableOtpReq] = useState(false)
    const [isDayScholar, setDayScholar] = useState(false)
    const { updateProfie } = useAuth()

    useEffect(() => {
        props.userData.dpUrl = `https://www.gravatar.com/avatar/${MD5(props.userData.email)}?d=retro&s=1000&r=x`
        console.log(props.userData.dpUrl);
    }, [])

    function lend() {
        navigate("/lend")
    }

    function borrow() {
        navigate("/borrow")
    }

    async function handleProfileEditSubmit(e) {
        e.preventDefault()
        console.log(editProfileInput)
        try {
            await updateProfie(editProfileInput)
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }

    async function handleOtpRequest(e) {
        e.preventDefault()
        setDisableOtpReq(true)
    }

    const handleEditProfileInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEditProfileInput((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        })
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>CEP | Edit Profile</title>
            </Helmet>
            {editProfile &&
                <div className='modal'>
                    <div className="modal-overlay"></div>
                    <div className="modal-body">
                        <div className="close-modal" onClick={() => toggleEditProfile(false)}>X</div>
                        <fieldset className='edit-profile-container'>
                            <legend>Edit Profile</legend>
                            <form onSubmit={handleProfileEditSubmit} id="ep-form">
                                <table className='edit-profile-form'>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label htmlFor="name">Name: </label>
                                            </td>
                                            <td>
                                                <input type="text" name='name' value={props.userData.name} disabled={true} onChange={handleEditProfileInput} required={true} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="email">Email: </label>
                                            </td>
                                            <td>
                                                <input type="text" name='email' value={props.userData.email} disabled={true} onChange={handleEditProfileInput} required={true} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="rollno">University Id: </label>
                                            </td>
                                            <td>
                                                <input type="number" name='rollno' onChange={handleEditProfileInput} required={true} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="campus">Campus: </label>
                                            </td>
                                            <td>
                                                <select type="text" name='campus' defaultValue={"Select"} onChange={handleEditProfileInput} required={true}>
                                                    <option value="Select" disabled>Select</option>
                                                    <option value="HP">HP</option>
                                                    <option value="PB">PB</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="branch">Branch: </label>
                                            </td>
                                            <td>
                                                <input type="text" name='branch' onChange={handleEditProfileInput} required={true} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="batch">Batch: </label>
                                            </td>
                                            <td>
                                                <input type="number" name='batch' onChange={handleEditProfileInput} required={true} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <label htmlFor="isDayScholar">Check this box if you are a day scholar</label>&nbsp;
                                                <input type="checkbox" name='isDayScholar' onChange={(e) => { handleEditProfileInput(e); setDayScholar(!isDayScholar) }} required={true} />
                                            </td>
                                        </tr>
                                        {!isDayScholar && <tr>
                                            <td>
                                                <label htmlFor="hostel">Hostel: </label>
                                            </td>
                                            <td>
                                                <input type="text" name='hostel' onChange={handleEditProfileInput} required={true} />
                                            </td>
                                        </tr>}
                                        {!isDayScholar && <tr>
                                            <td>
                                                <label htmlFor="roomNum">Room Number: </label>
                                            </td>
                                            <td>
                                                <input type="number" name='roomNum' onChange={handleEditProfileInput} required={true} />
                                            </td>
                                        </tr>}
                                        {!props.userData.isVerified &&
                                            <tr>
                                                <td colSpan={2}>
                                                    Verify your email
                                                    <button className="btn-send-otp button-82-pushable" role="button" onClick={handleOtpRequest} disabled={disableOtpReq}>
                                                        <span className="button-82-shadow"></span>
                                                        <span className="button-82-edge"></span>
                                                        <span className="button-82-front text">
                                                            Send OTP
                                                        </span>
                                                    </button>
                                                </td>
                                            </tr>
                                        }
                                        {!props.userData.isVerified &&
                                            <tr>
                                                <td>
                                                    <label htmlFor="otp">OTP: </label>
                                                </td>
                                                <td>
                                                    <input type="number" name='otp' onChange={handleEditProfileInput} required={true} />
                                                </td>
                                            </tr>
                                        }
                                        <tr>
                                            <td colSpan={2}>
                                                <button className="button-82-pushable" role="button" type='submit' form='ep-form'>
                                                    <span className="button-82-shadow"></span>
                                                    <span className="button-82-edge"></span>
                                                    <span className="button-82-front text">
                                                        Save Changes
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </fieldset>
                    </div>
                </div>
            }
            {props.verifyModal &&
                !props.userData.isVerified &&
                <div className='modal'>
                    <div className="modal-overlay"></div>
                    <div className="modal-body">
                        <div className="close-modal" onClick={() => props.verifyModalToggle(false)}>X</div>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={2}>
                                        Verify your email
                                        <button className="btn-send-otp button-82-pushable" role="button" onClick={handleOtpRequest} disabled={disableOtpReq}>
                                            <span className="button-82-shadow"></span>
                                            <span className="button-82-edge"></span>
                                            <span className="button-82-front text">
                                                Send OTP
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="otp">OTP: </label>
                                    </td>
                                    <td>
                                        <input type="number" name='otp' onChange={handleEditProfileInput} required={true} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            <div className="profile-section">
                <div className="user-details paper white">

                    <div className="top-tape"></div>
                    <div className="user-avatar">
                        {props.userData && <img src="https://www.gravatar.com/avatar/242600846a716588f455fbb330e2d035?s=1000&d=retro&r=x" />}
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
                    <div className="pencil-icon" onClick={() => toggleEditProfile(true)}>
                        <img src={pencilIcon} alt="" />
                    </div>
                </div>
                <div className="user-profile-actions">
                    <button className="button-82-pushable" role="button" onClick={lend}>
                        <span className="button-82-shadow"></span>
                        <span className="button-82-edge"></span>
                        <span className="button-82-front text">
                            LEND
                        </span>
                    </button>
                </div>
            </div>
        </React.Fragment >
    )
}

export default ProfileSection