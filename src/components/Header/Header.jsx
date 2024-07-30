// import React from 'react'
// import './Header.css'

// function Header() {
//   return (
//     <div className='header'>
//       <div className="header-contents">
//         <h2>Order your favourite food here</h2>
//         <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
//         <button>View Menu</button>
//       </div>
//     </div>
//   )
// }

// export default Header

import React, { useState } from 'react';
import './Header.css';

function Header() {
  const [showScrollText, setShowScrollText] = useState(false);

  const handleButtonClick = () => {
    setShowScrollText(true);
    // Reset the animation
    const scrollText = document.getElementById("scrollText");
    scrollText.style.animation = 'none';
    scrollText.offsetHeight; /* trigger reflow */
    scrollText.style.animation = null;
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time</p>
        <button onClick={handleButtonClick}>
          {showScrollText && 
            <div id="textContainer">
              <p id="scrollText">Welcome to Good Chops Food delivery services, choose your meals and we will have it delivered</p>
            </div>
          }
          View Menu
        </button>
      </div>
    </div>
  )
}

export default Header;
