import React from 'react';
import './Thanks.css';
import { assets } from '../../assets/assets';

function Thanks() {
  return (
    <>
      <div className='banner'>
        <div className="slider" style={{ '--quantity': 10 }}>
          <div className="item" style={{ '--position': 1 }}><img src={assets.food_5} alt="Logo 4" /></div>
          <div className="item" style={{ '--position': 2 }}><img src={assets.logo4} alt="Logo 2" /></div>
          <div className="item" style={{ '--position': 3 }}><img src={assets.food_16} alt="Logo 3" /></div>
          <div className="item" style={{ '--position': 4 }}><img src={assets.food_14} alt="Logo 4" /></div>
          <div className="item" style={{ '--position': 5 }}><img src={assets.food_12} alt="Logo 2" /></div>
          <div className="item" style={{ '--position': 6 }}><img src={assets.food_16} alt="Logo 3" /></div>
          <div className="item" style={{ '--position': 7 }}><img src={assets.food_24} alt="Logo 4" /></div>
          <div className="item" style={{ '--position': 8 }}><img src={assets.food_5} alt="Logo 2" /></div>
          <div className="item" style={{ '--position': 9 }}><img src={assets.food_30} alt="Logo 3" /></div>
          <div className="item" style={{ '--position': 10 }}><img src={assets.food_18} alt="Logo 4" /></div>
        </div>
        <div className="content">
          <h1 data-content="Thank You">Thank You</h1>
          <div className="author">
            <h2>Your Payment was Successful</h2>
            <p><b>Thank You For Your Patronage</b></p>
            <p>Let us deliver your meal as you like it.</p>
          </div>
          <div className="model"></div>
        </div>
      </div>
    </>
  );
}

export default Thanks;
