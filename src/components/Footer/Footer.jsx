import React, { useContext, useState } from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';


function Footer() {
  const {url} = useContext(StoreContext)
  const [showPopup, setShowPopup] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);             // to know if user is in registration mode
  const [email, setEmail] = useState('');
  const [passKey, setPassKey] = useState('');

  const openLoginPopup = () => {
    setShowPopup(true);
    setIsRegistering(false);                       // takes me back to login mode
  };

  const closeLoginPopup = () => {
    setShowPopup(false);
    setEmail('');
    setPassKey('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, passKey });

    try {
      const response = await fetch(url + '/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, passKey })
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, response data:', data);
        localStorage.setItem('token', data.token);
        window.location.href = 'https://food-delivery-admin-green.vercel.app/orders';
      } else {
        const errorData = await response.json();
        console.error('Login failed, error data:', errorData);
        alert('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
};


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch( url + '/api/admin/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        alert('Registration successful! Please log in.');
        setIsRegistering(false);                                     //to switch back to login mode
        setEmail('');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img className='logoo' src={assets.logo4} alt="Logo" onClick={scrollToTop} />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem assumenda corporis libero quam ut deserunt quaerat inventore expedita dolores. Omnis laudantium obcaecati soluta.</p>
          <div className="footer-social-icons">
            <a href="https://web.facebook.com" target='_blank' rel='noopener noreferrer'><img src={assets.facebook_icon} alt="" /></a>
            <a href="https://twitter.com" target=' _blank' rel='noopener noreferrer'><img src={assets.twitter_icon} alt="" /></a>
            <a href="https://www.linkedin.com" target='_blank' rel='noopener noreferrer'><img src={assets.linkedin_icon} alt="" /></a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+234-7036594624</li>
            <li>contact@good-chops.com</li>
            <li><button onClick={openLoginPopup}>Admin Login</button></li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 &copy; All Rights Reserved </p>
      <marquee behavior="" direction="">Designed and Created by Adebisi Bobby Goodluck.....ABG Info Tech Ltd..</marquee>

      {showPopup && (
        <div className="login-popup">
          <div className="login-popup-content">
            <h2>{isRegistering ? 'Register' : 'Admin Login'}</h2>
            {isRegistering ? (
              <form onSubmit={handleRegister}>
                <input 
                  type="email" 
                  placeholder='Email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Register</button>
                <p>Already have an account? <button type="button" onClick={() => setIsRegistering(false)}>Login here</button></p>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <input 
                  type="email" 
                  placeholder='Email' 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input 
                  type="password" 
                  placeholder='PassKey' 
                  value={passKey} 
                  onChange={(e) => setPassKey(e.target.value)}
                  required
                />
                <button type="submit">Login</button>
                <p>Don't have an account? <button type="button" onClick={() => setIsRegistering(true)}>Register here</button></p>
              </form>
            )}
            <button onClick={closeLoginPopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footer;
