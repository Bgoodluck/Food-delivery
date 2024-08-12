import React, { useEffect, useContext, useState } from 'react';
import './MenuDisplay.css';
import { StoreContext } from '../../context/StoreContext';

function MenuDisplay({ selectedRestaurant, filteredFoods = [], onClose }) {

    const { url, addToCart } = useContext(StoreContext);
    const [foods, setFoods] = useState(filteredFoods);


    useEffect(() => {
        if (selectedRestaurant) {
          if (filteredFoods.length === 0) {
            
            fetch(`${url}/api/food/list`)
              .then(response => response.json())
              .then(data => {
                if (data.success) {
                  const matchedFoods = data.data.filter(food => food.restaurant === selectedRestaurant.name);
                  setFoods(matchedFoods);
                } else {
                  console.error('Error fetching foods:', data.message);
                }
              })
              .catch(error => console.error('Error fetching data:', error));
          } else {
            setFoods(filteredFoods);
          }
        } else {
          setFoods([]);
        }
      }, [selectedRestaurant, filteredFoods, url]);
    
      const handleAddToCart = (food) => {
        addToCart(food._id);
        console.log(`Added ${food.name} to cart`);
      };
    


      return (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={onClose}>Close</button>
            <h2>{selectedRestaurant ? `Menu for ${selectedRestaurant.name}` : 'Select a restaurant'}</h2>
            {foods && foods.length > 0 ? (
              <div className="menu-list">
                {foods.map(food => (
                  <div key={food._id} className="menu-item">
                    <img src={`${url}/uploads/${food.image}`} alt={food.name} />
                    <h3>{food.name}</h3>
                    <p>₦{food.price}</p>
                    <button onClick={() => handleAddToCart(food)}>Add to Cart</button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No menu items available.</p>
            )}
          </div>
        </div>
      );
    }
    
    export default MenuDisplay;