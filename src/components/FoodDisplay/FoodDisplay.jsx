import React, { useState, useEffect, useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import RestDetails from '../RestDetails/RestDetails';
import { IoCloseCircle } from 'react-icons/io5';
import { PiHandArrowUpThin } from "react-icons/pi";


function FoodDisplay({ category }) {
  const { food_list, url } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

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

  const filteredFoods = food_list.filter(item =>
    item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (category === "All" || category === item.category)
  );

  const filteredRestaurants = restaurants.filter(item => {
    const restaurantName = item.name || "";
    const lowerCaseRestaurantName = restaurantName.toLowerCase();
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    return lowerCaseRestaurantName.includes(lowerCaseSearchQuery) &&
           (category === "All" || category === restaurantName);
  });


  return (
    <div className='food-display' id='food-display'>
      <div className='scroll' onClick={scrollToTop}><b><PiHandArrowUpThin /></b></div>
      <div className="food-display-header">  
          
      <h2>Top dishes and restaurants near you</h2>
        <div className="navbar-search">
          <input 
            type="text" 
            placeholder="Search for food or restaurant..." 
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select onChange={handleSearchTypeChange} value={searchType} className="search-dropdown">
            <option value="all">All</option>
            <option value="foods">Foods</option>
            <option value="restaurants">Restaurants</option>
          </select>
        </div>
      </div>

      <div className="food-display-list">
        {searchType === "all" && (
          <>
            <h3>Foods</h3>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((item) => (
                <FoodItem 
                  key={item._id} 
                  id={item._id} 
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  restaurant={item.restaurant}
                />
              ))
            ) : (
              <p>No foods found.</p>
            )}
            <h3>Restaurants</h3>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((item) => (
                <div
                  key={item._id}
                  className="restaurant-card"
                  onClick={() => handleThumbnailClick(item._id)}
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
                    <p className="restaurant-operating-hours"><b>Time: </b>{item.operating_hours}</p>
                    <p className="restaurant-operating-hours">{item.operating_days}</p>
                    <p className="restaurant-address"><b>Menu: </b>{item.menu}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No restaurants found.</p>
            )}
            
          </>
        )}

        {searchType === "foods" && (
          <>
            <h3>Foods</h3>
            {filteredFoods.length > 0 ? (
              filteredFoods.map((item) => (
                <FoodItem 
                  key={item._id} 
                  id={item._id} 
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  restaurant={item.restaurant}                  
                />
              ))
            ) : (
              <p>No foods found.</p>
            )}
          </>
        )}

        {searchType === "restaurants" && (
          <>
            <h3>Restaurants</h3>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((item) => (
                <div
                  key={item._id}
                  className="restaurant-card"
                  onClick={() => handleThumbnailClick(item._id)}
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
                    <p className="restaurant-operating-hours"><b>Time: </b>{item.operating_hours}</p>
                    <p className="restaurant-operating-hours">{item.operating_days}</p>
                    <p className="restaurant-address"><b>Menu: </b>{item.menu}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No restaurants found.</p>
            )}
          </>
        )}
      </div>

      {selectedRestaurant && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}><IoCloseCircle /></button>
            <RestDetails restaurant={selectedRestaurant} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FoodDisplay;

