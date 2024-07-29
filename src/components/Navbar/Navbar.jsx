import React, { useContext, useState } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

function Navbar({ setShowLogin }) {
    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount, token, setToken, userProfile } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };
    console.log("Current userProfile in Navbar:", userProfile);

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo4} alt="" className='logo' /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-restaurants' onClick={() => setMenu("restaurants")} className={menu === "restaurants" ? "active" : ""}>Restaurants</a>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                ) : (
                    <div className='navbar-profile'>
                        <img src={assets.profile_icon} alt="" />
                        <b>
                                 {userProfile && userProfile.firstName 
                                          ? userProfile.firstName 
                                          : 'User'}
                        </b>
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/profile')}><img src={assets.bag_icon} alt="" /><p>Profile</p></li>
                            <hr />
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Log out</p></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
