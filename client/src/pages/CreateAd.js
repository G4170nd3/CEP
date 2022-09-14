import React, { useState } from 'react'
import Tabs, { Tab } from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import { useAuth } from '../context/AuthContext';
import './CreateAd.css'

function CreateAd() {
  // Ad Object Schema = 
  //  {
  //    name: "",
  //    desc: "",
  //    cost: "",
  //    costBy: "",
  //    img: ""
  //  }

  const [formCurrentTab, setFormCurrentTab] = useState(0)
  const [adValid, setAdValid] = useState(false)
  const [inputAdData, setInputAdData] = useState({})
  const [userProductImg, setUserProductImg] = useState("/")
  const { saveUserAd } = useAuth()

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

  async function inputHandler(e) {
    let name = e.target.name
    let value = e.target.value
    if (name == "img") {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setUserProductImg(base64)
      value = base64
    }
    setInputAdData((lastValue) => {
      return {
        ...lastValue,
        [name]: value
      }
    })
  }

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  //send created ad object to /users/createad
  function createAdObject() {
    try {
      if((inputAdData.name == undefined || inputAdData.name == "") || (inputAdData.desc == undefined || inputAdData.desc == "") || (inputAdData.cost == undefined || inputAdData.cost <= 0) || (inputAdData.costBy == undefined || inputAdData.costBy == "")) throw Error("Please fill all the fields correctly.")
      saveUserAd(inputAdData)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Create Ad</h1>
      <Tabs activeTab={formCurrentTab} className="mt-5" ulClassName="" activityClassName="bg-success" onClick={(e, tab) => setFormCurrentTab(tab - 1)}>
        <Tab title="Details" className="tabs">
          <div className="tab-data-container">
            <div className='flex-col'>
              <input name="name" type='text' placeholder='Name of product' onChange={inputHandler} />
              <textarea name='desc' placeholder='Description' type='text' onChange={inputHandler}></textarea>
              <input name='cost' placeholder='Cost' type='number' onChange={inputHandler} />
              <select name='costBy' defaultValue={"none"} onChange={inputHandler}>
                <option value="none" disabled={true}>Select Cost Type</option>
                <option value="hour">Cost Per Hour</option>
                <option value="day">Cost Per Day</option>
                <option value="usage">Cost Per Usage</option>
              </select>
              <input name='img' placeholder='Image' type='file' onChange={inputHandler} />
            </div>
            <div className='flex-col'>
              <img src={userProductImg} hidden={userProductImg === "/"} className='create-ad-product-img' alt="" />
            </div>
          </div>
          <div className="user-form-actions-container">
            <button className='post-ad-form-action-btn' onClick={prevFormTab} disabled={true}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </button>
            <button className='post-ad-form-action-btn' onClick={nextFormTab}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
              </svg>
            </button>
          </div>
        </Tab>
        <Tab title="Verify" className="tabs">
          <div className="tab-data-container">
            <div className='flex-col'>
              <div className='flex-row'>
                <label htmlFor="name">Name: </label><input type='text' disabled={true} value={inputAdData?.name} />
              </div>
              <div className='flex-row'>
                <label htmlFor="name">Description: </label><textarea type='text' disabled={true} value={inputAdData?.desc} />
              </div>
              <div className='flex-row'>
                <label htmlFor="cost">Cost: </label>
                <div className='flex-col'>
                  <input type='text' disabled={true} value={inputAdData?.cost} />
                  <input type='text' disabled={true} value={"Per " + inputAdData?.costBy} />
                </div>
              </div>
            </div>
            <div className='flex-col'>
              <img src={userProductImg} hidden={!userProductImg} className="create-ad-product-img" alt="" />
            </div>
          </div>
          <div className="user-form-actions-container">
            <button className='post-ad-form-action-btn' onClick={prevFormTab}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
              </svg>
            </button>
            <button className='post-ad-form-action-btn' onClick={createAdObject}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-file-earmark-plus-fill" viewBox="0 0 16 16"> <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0z" /> </svg>
            </button>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default CreateAd