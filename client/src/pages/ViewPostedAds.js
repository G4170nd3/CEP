import React from 'react'
import { useAuth } from '../context/AuthContext'
import ViewAds from '../layout/ViewAds'

function ViewPostedAds() {
  const { inventory } = useAuth()
  return (
    <div>
      <ViewAds enableDeactivate={true} items={inventory} />
    </div>
  )
}

export default ViewPostedAds