import React from 'react'
import './Logo.css'
import { assets } from '../../assets/assets'

function Logo({onClick}) {
  return (
    <div className='logo1'>
      <img
       src={assets.logo4}
        alt="Logo" 
        className="logo"
      onClick={onClick} />
    </div>
  )
}

export default Logo
