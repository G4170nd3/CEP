import React from 'react'
import './ViewAds.css'

function ViewAds(props) {
    return (
        <div className='view-items-page'>
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
                                        <button>View Details</button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })
                    : 
                    <>
                        <p style={{color: "#fff"}}>Oops! Inventory is empty :(</p>
                    </>
                }
            </div>
        </div>
    )
}

export default ViewAds