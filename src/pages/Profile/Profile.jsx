import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './Profile.css'; 

function Profile() {
    const { userProfile, updateUserProfile, error, success } = useContext(StoreContext);
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        image: '' 
    });
    const [selectedImage, setSelectedImage] = useState(null); 

    useEffect(() => {
        if (userProfile) {
            setProfileData(userProfile);
        }
    }, [userProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setSelectedImage(file);
        setProfileData(prevData => ({ ...prevData, image: file }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('firstName', profileData.firstName);
        formData.append('lastName', profileData.lastName);
        formData.append('email', profileData.email);
        formData.append('phone', profileData.phone);
        formData.append('address', profileData.address);
    
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
    
        try {
            await updateUserProfile(formData);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    return (
        <div className="profile">
            <h2>Profile</h2>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">Profile updated successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div className="profile-image">
                    <img 
                        src={profileData.image ? `/uploads/${profileData.image}` : `${assets.profile_icon}`} 
                        alt="Profile" 
                        className='profile-img'
                    />
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange}
                        id="profileImage"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="profileImage" className="upload-btn">Change Profile Picture</label>
                </div>
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
}

export default Profile;
