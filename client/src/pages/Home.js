import React from 'react'
import { useAuth } from '../context/AuthContext'
import ViewAds from '../layout/ViewAds'
import './Home.css'

function Home() {
  const { inventory } = useAuth()

  return (
    <div className='page-container inventory-container'>
      <div className="inventory-header">
        <h1>OUR INVENTORY</h1>
        <div className="inventory-sort-actions">
          <label htmlFor="sort-type">Sort: </label>
          <select name="sort-type" id="">
            <option value="0">A-Z</option>
            <option value="1">Z-A</option>
            <option value="2">Price: High to Low</option>
            <option value="3">Price: Low to High</option>
          </select>
        </div>
      </div>
      <div className="ads-wrapper-home">
        <ViewAds items={inventory} />
      </div>
    </div>
  )
}

export default Home