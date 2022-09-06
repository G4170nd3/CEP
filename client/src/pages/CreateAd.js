import React, { useState } from 'react'
import Tabs, { Tab } from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';

function CreateAd() {

  const [formCurrentTab, setFormCurrentTab] = useState(0)

  function nextFormTab() {
    if (formCurrentTab + 1 > 2) return
    document.getElementsByClassName("tabs")[formCurrentTab + 1].click()
    setFormCurrentTab(formCurrentTab + 1)
  }

  function prevFormTab() {
    if (formCurrentTab - 1 < 0) return
    document.getElementsByClassName("tabs")[formCurrentTab - 1].click()
    setFormCurrentTab(formCurrentTab - 1)
  }

  function openFormTab(tab) {
    document.getElementsByClassName("tabs")[tab].click()
    setFormCurrentTab(tab)
  }

  return (
    <div>
      <h1>Lend an Item</h1>
      <Tabs activeTab={formCurrentTab} className="mt-5" ulClassName="" activityClassName="bg-success" onClick={(e, tab) => setFormCurrentTab(tab - 1)}>
        <Tab title="Details" className="tabs">
          <div className="tab-data-container">
            <label htmlFor="name">Name of the product: </label>
            <input name='name' placeholder='Name' type='text' /><br />
            <label htmlFor="description">Description: </label>
            <textarea name='description' placeholder='Description' type='text'></textarea><br />
            <label htmlFor="img">Image: </label>
            <input name='img' placeholder='Image' type='file' /><br />
          </div>
          <div className="user-form-actions-container">
            <button onClick={nextFormTab}>Next</button>
          </div>
        </Tab>
        <Tab title="Payment" className="tabs">
          <div className="tab-data-container">
            <label htmlFor="name">Cost: </label>
            <input name='number' placeholder='' type='number' /><br/>
            <select defaultValue={"Per Hour"}>
              <option value="hour">Per Hour</option>
              <option value="day">Per Day</option>
              <option value="usage">Per Usage</option>
            </select>
          </div>
          <div className="user-form-actions-container">
            <button onClick={prevFormTab}>Previous</button>
            <button onClick={nextFormTab}>Next</button>
          </div>
        </Tab>
        <Tab title="Verify" className="tabs">
          <div className="tab-data-container">
            <label htmlFor=""></label>
          </div>
          <div className="user-form-actions-container">
            <button onClick={prevFormTab}>Previous</button>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default CreateAd