import React, { useContext, useEffect, useState } from 'react';
import './Logo.css';
import { StoreContext } from '../../context/StoreContext';
import MenuDisplay from '../MenuDisplay/MenuDisplay';

function Logo() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { url } = useContext(StoreContext);

  useEffect(() => {
    fetch(`${url}/api/restaurant/list`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setRestaurants(data.data);
        } else {
          console.error('Error fetching restaurants:', data.message);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [url]);

  const handleThumbnailClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const closePopup = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className='explore-rmenu' id='explore-restaurants'>
      <h1 className='explore-rmenu-text'>Select menu from restaurants</h1>
      <div className="explore-rmenu-list">
        {restaurants.map((item, index) => (
          <div
            key={index}
            className='explore-rmenu-list-item'
            onClick={() => handleThumbnailClick(item)}
          >
            <img src={`${url}/uploads/${item.image}`} alt={item.name} />
            <p><b>{item.aka}</b></p>
          </div>
        ))}
      </div>
      <hr />
      {selectedRestaurant && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>Close</button>
            <MenuDisplay selectedRestaurant={selectedRestaurant} onClose={closePopup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;
