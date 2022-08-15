import React, { useEffect } from 'react'
import ContentLoader from 'react-content-loader'
import { useAuth } from '../context/AuthContext'
import ProfileSection from '../layout/ProfileSection'
import './ViewOrders.css'

function ViewOrders(props) {
  const { userOrders, getUserOrders } = useAuth()
  useEffect(() => {
    async function fetchOrders() {
      await getUserOrders()
    }
    fetchOrders()
  }, [userOrders])

  return (
    <div>
      <h1>View Orders</h1>
      <div className="order-cards-container">
        {userOrders ? userOrders.map(order => {
          return (
            <div className='order-card'>
              <div className="item-name">
                <h4>{order.itemDetails.itemName}</h4>
                <strong>{order.itemDetails.metadata.brand}</strong>
                <p>{order.itemDetails.desc}</p>
                <p>Amount: Rs. {order.transactionAmount}</p>
                <p>Ordered At: {order.dateOfTransaction}</p>
              </div>
            </div>
          )
        })
          :
          <ContentLoader viewBox={"0 0 " + (window.innerWidth - 80) + " 250"} 
          foregroundColor="#ffcb74"
          >
            <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
            <rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
            <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
            <rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
            <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
            <rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
            <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="690" y="250" rx="0" ry="0" width="200" height="18" />
            <rect x="690" y="275" rx="0" ry="0" width="120" height="20" />
            <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="910" y="250" rx="0" ry="0" width="200" height="18" />
            <rect x="910" y="275" rx="0" ry="0" width="120" height="20" />
            <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />
            <rect x="1130" y="250" rx="0" ry="0" width="200" height="18" />
            <rect x="1130" y="275" rx="0" ry="0" width="120" height="20" />
          </ContentLoader>
        }
      </div>
    </div>
  )
}

export default ViewOrders