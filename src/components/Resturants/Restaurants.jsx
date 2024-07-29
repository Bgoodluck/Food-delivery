import React, { useState, useEffect, useContext } from 'react';
import './Restaurants.css';
import RestDetails from '../RestDetails/RestDetails';
import { StoreContext } from '../../context/StoreContext';
import { IoCloseCircle } from "react-icons/io5";
import Logo from '../Logo/Logo';

function Resturants({ category, setCategory, searchQuery = "" }) {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
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

  const handleThumbnailClick = (restaurantId) => {
    const restaurant = restaurants.find(item => item._id === restaurantId);
    setSelectedRestaurant(restaurant);
  };

  const closePopup = () => {
    setSelectedRestaurant(null);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const filteredRestaurants = restaurants.filter(item => {
    const restaurantName = item.name || "";
    const lowerCaseRestaurantName = restaurantName.toLowerCase();
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    return lowerCaseRestaurantName.includes(lowerCaseSearchQuery) &&
           (category === "All" || category === restaurantName);
  });

  return (
    <div className='explore-background'>
      <div className='explore-rest' id='explore-restaurants'>
      <h1>Our Partner Restaurants</h1>
        <div className='scroll'>
        <b onClick={scrollToTop}>Top</b>
        </div>
        <p className='explore-rest-text'>
          <b>
          From a wide range of restaurants, allow us to dazzle you while satisfying your cravings and elevate your dining experience from professional chefs. Order from any of our partner restaurants and allow us to deliver to your doorstep.
          </b>
        </p>
        <marquee behavior="" direction="">
          <div className="explore-rest-list">
            {filteredRestaurants.length > 0 ? (
              <div className="restaurant-grid">
                {filteredRestaurants.map((item) => (
                  <div
                    onClick={() => handleThumbnailClick(item._id)}
                    key={item._id}
                    className='restaurant-card'
                  >
                    <img
                      src={`${url}/uploads/${item.image}`} 
                      alt={item.name}
                      className="restaurant-image"
                      onError={(e) => {
                        e.target.src = '/path/to/placeholder-image.jpg'; 
                        console.error('Error loading image:', e.target.src);
                      }}
                    />
                    <div className="restaurant-info">
                      <h3 className="restaurant-name">{item.name}</h3>
                      <p className="restaurant-address">{item.address}</p>
                      <p className="restaurant-operating-hours"><b>Time: </b> {item.operating_hours}</p>
                      <p className="restaurant-operating-hours">{item.operating_days}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No restaurants available.</p>
            )}
          </div>
        </marquee>
        <hr />
        {selectedRestaurant && (
          <div className="popup-overlay">
            <div className="popup-content">
              <button className="close-btn" onClick={closePopup}><IoCloseCircle /></button>
              <RestDetails restaurant={selectedRestaurant} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resturants;

