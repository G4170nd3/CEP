import React from 'react'
import { useAuth } from '../context/AuthContext'
import ViewAds from '../layout/ViewAds'

function ViewCreatedAds() {
  const { inventory } = useAuth()
  return (
    <div>
      <ViewAds enablePost={true} enableEdit={true} enableDelete={true} items={inventory} />
    </div>
  )
}

export default ViewCreatedAds