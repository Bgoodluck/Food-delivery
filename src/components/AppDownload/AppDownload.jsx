import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
import { PiHandArrowUpThin } from "react-icons/pi";

function AppDownload() {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='app-download' id='app-download'>
      <div className='scroll' onClick={scrollToTop}><b><PiHandArrowUpThin /></b></div>
        <p>For Better Experience Download  <br /> Good Chops App</p>
        <div className="app-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}

export default AppDownload
