import React, { useState } from 'react'
import './ViewAds.css'

function ViewAds(props) {
    const [editModal, toggleEditModal] = useState(false)
    const [editAdInput, setEditAdInput] = useState({})
    const [selectedAdData, setSelectedAdData] = useState({})
    const [disableEditReq, toggleDisableEditReq] = useState(true)

    function handleEditRequest() {

    }

    function handleEditAdInput(e) {
        const name = e.target.name
        const value = e.target.value
        setEditAdInput((lastValue) => {
            return {
                ...lastValue,
                [name]: value
            }
        })
    }

    return (
        <div className='view-items-page'>
            {editModal &&
                <div className='modal'>
                    <div className="modal-overlay"></div>
                    <div className="modal-body edit-ad-modal">
                        <div className="close-modal" onClick={() => toggleEditModal(false)}>X</div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <img src={selectedAdData.img} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="adName">Name: </label>
                                    </td>
                                    <td>
                                        <input type="text" name='adName' onChange={handleEditAdInput} value={selectedAdData.name} required={true} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="desc">Description: </label>
                                    </td>
                                    <td>
                                        <textarea type="number" name='desc' onChange={handleEditAdInput} value={selectedAdData.desc} required={true} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="cost">Cost: </label>
                                    </td>
                                    <td>
                                        <input type="number" name='cost' onChange={handleEditAdInput} value={selectedAdData.cost} required={true} />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="cost-by">Cost By: </label>
                                    </td>
                                    <td>
                                        <select type="text" name='cost-by' onChange={handleEditAdInput} value={selectedAdData.costby} required={true}>
                                            <option value="hour">By Hour</option>
                                            <option value="day">By Day</option>
                                            <option value="usage">By Usage</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <button className="btn-send-otp button-82-pushable" role="button" onClick={handleEditRequest} disabled={disableEditReq}>
                                            <span className="button-82-shadow"></span>
                                            <span className="button-82-edge"></span>
                                            <span className="button-82-front text">
                                                Update
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            }
            <div className="item-cards-container">
                {props.items?.length > 0 ?
                    props.items.map((item) => {
                        return (
                            <React.Fragment>
                                <div className="item-card">
                                    <div className="item-details">
                                        <img src={item.img} alt="" />
                                        <h3>{item.name}</h3>
                                        <p>{item.desc}</p>
                                    </div>
                                    <div className="item-user-actions">
                                        {props.enableDetails ? <button className='button-55 button-white view-details-btn item-card-btn'>View Details</button> : <></>}
                                        {props.enableEdit ? <button className='button-55 button-white edit-btn item-card-btn' onClick={() => { toggleEditModal(true); window.scrollTo({ top: 0, left: 0, behavior: 'smooth'}) }}>Edit</button> : <></>}
                                        {props.enablePost ? <button className='button-55 button-green post-details-btn item-card-btn'>Post</button> : <></>}
                                        {props.enableDelete ? <button className='button-55 button-red delete-details-btn item-card-btn'>Delete</button> : <></>}
                                        {props.enableDeactivate ? <button className='button-55 button-red deactivate-btn item-card-btn'>Deactivate</button> : <></>}
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                    :
                    <>
                        <p style={{ color: "#fff" }}>Oops! Inventory is empty :(</p>
                    </>
                }
            </div>
        </div>
    )
}

export default ViewAds