import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Profile.css'; 

function Profile  () {
    const { userProfile, updateUserProfile, error, success } = useContext(StoreContext);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (userProfile) {
            setProfileData(userProfile);
        }
    }, [userProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(profileData);
    };

    return (
        <div className="profile">
            <h2>Profile</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Profile updated successfully!</p>}
            <form onSubmit={handleSubmit}>
            <input 
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        type="text"
                        placeholder="First Name"
                    />
                    <input 
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Last Name"
                    />
                    <input 
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email"
                    />
                    <input 
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="Phone"
                    />
                    <input 
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        type="text"
                        placeholder="Address"
                    />
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;





