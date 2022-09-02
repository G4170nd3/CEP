import React, { useState } from 'react'
import Tabs, { Tab } from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';

function Lend() {

  const [formCurrentTab, setFormCurrentTab] = useState(0)

  function nextFormTab() {
    document.getElementsByClassName("tabs")[formCurrentTab + 1].click()
    setFormCurrentTab(formCurrentTab + 1)
  }

  function prevFormTab() {
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
            <label htmlFor=""></label>
          </div>
          <div className="user-form-actions-container">
            <button onClick={prevFormTab}>Previous</button>
            <button onClick={nextFormTab}>Next</button>
          </div>
        </Tab>
        <Tab title="Payment" className="tabs">
          <div className="tab-data-container">
            <label htmlFor=""></label>
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
            <button onClick={nextFormTab}>Next</button>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Lend