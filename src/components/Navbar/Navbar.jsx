import React, { useContext, useState, useEffect } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

function Navbar({ setShowLogin }) {
    const [menu, setMenu] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 750);
    const { getTotalCartAmount, token, setToken, userProfile, url } = useContext(StoreContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 750);
            if (window.innerWidth > 750) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo4} alt="" className='logo' /></Link>
            {isMobile && (
                <div className="hamburger-icon" onClick={toggleMenu}>
                    &#9776;
                </div>
            )}
            <ul className={`navbar-menu ${isMenuOpen && isMobile ? 'open' : ''}`}>
                <Link to='/' onClick={() => {setMenu("home"); toggleMenu();}} className={menu === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-restaurants' onClick={() => {setMenu("restaurants"); toggleMenu();}} className={menu === "restaurants" ? "active" : ""}>Restaurants</a>
                <a href='#explore-menu' onClick={() => {setMenu("menu"); toggleMenu();}} className={menu === "menu" ? "active" : ""}>Menu</a>
                <a href='#app-download' onClick={() => {setMenu("mobile-app"); toggleMenu();}} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => {setMenu("contact-us"); toggleMenu();}} className={menu === "contact-us" ? "active" : ""}>Contact Us</a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-search-icon">
                    <Link to='/cart'><img className='imgtwo' src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                </div>
                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Login</button>
                ) : (
                    <div className='navbar-profile'>
                        <div className="profile-picture" onClick={toggleDropdown}>
                            <img 
                                src={userProfile?.image ? `${url}/uploads/${userProfile.image}` : assets.profile_icon} 
                                alt="Profile" 
                                className='profile-img'
                            />
                        </div>
                        <b>
                            {userProfile && userProfile.firstName 
                                ? userProfile.firstName 
                                : 'User'}
                        </b>
                        <ul className={`nav-profile-dropdown ${isDropdownOpen ? 'open' : ''}`}>
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
