import React, { useState, useEffect, useContext } from 'react';
import MenuDisplay from '../MenuDisplay/MenuDisplay';
import RestDetails from '../RestDetails/RestDetails';
import { StoreContext } from '../../context/StoreContext';

function RestaurantDetailsContainer() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const { url } = useContext(StoreContext);
  const [showMenuDisplay, setShowMenuDisplay] = useState(false);

 
  useEffect(() => {
    fetch(`${url}/api/food/list`)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setFoods(data.data);
          console.log('Fetched foods:', data.data);
        } else {
          console.error('Error fetching foods:', data.message);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [url]);

  
  useEffect(() => {
    if (selectedRestaurant) {
      fetch(`${url}/api/restaurant/list`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const restaurant = data.data.find(r => r.name === selectedRestaurant.name);
            setRestaurantDetails(restaurant);
            console.log('Restaurant details:', restaurant);

          
            const matchedFoods = foods.filter(
              food => food.restaurant === selectedRestaurant.name
            );
            setFilteredFoods(matchedFoods);
            console.log('Filtered foods:', matchedFoods);
          } else {
            console.error('Error fetching restaurant details:', data.message);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    } else {
      setFilteredFoods([]);
      setRestaurantDetails(null);
    }
  }, [selectedRestaurant, foods, url]);

  return (
    <div>
      {restaurantDetails && (
        <RestDetails
          restaurant={restaurantDetails}
          filteredFoods={filteredFoods}
          onShowMenu={() => setShowMenuDisplay(true)}
        />
      )}
      {showMenuDisplay && selectedRestaurant && (
        <MenuDisplay
          selectedRestaurant={selectedRestaurant}
          filteredFoods={filteredFoods}
          onClose={() => setShowMenuDisplay(false)}
        />
      )}
    </div>
  );
}

export default RestaurantDetailsContainer;
