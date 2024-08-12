import React, { useState, useCallback, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './RestDetails.css';
import { StoreContext } from '../../context/StoreContext';

function SimpleMap({ location }) {
  if (!location) return null;

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>{location.address}</Popup>
      </Marker>
    </MapContainer>
  );
}

function RestDetails({ restaurant, filteredFoods = [] }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { url } = useContext(StoreContext);

  const handleLocationClick = useCallback(async (address) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await response.json();
      if (data.length > 0) {
        const newLocation = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          address: address
        };
        setSelectedLocation(newLocation);
        setShowPopup(true);
      } else {
        const fallbackLocation = {
          lat: 0,
          lng: 0,
          address: "Location not found"
        };
        setSelectedLocation(fallbackLocation);
        setShowPopup(true);
        alert("Couldn't find the exact location. Showing a default map.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("An error occurred while fetching the location. Please try again.");
    }
  }, []);

  if (!restaurant) {
    return null;
  }

  const { name, image, address, operating_hours, operating_days } = restaurant;

  console.log('Filtered Foods:', filteredFoods)

  return (
    <div className="rest-details">
      <h2>{name}</h2>
      <img src={`${url}/uploads/${image}`} alt={name} className="restaurant-image" />
      <h3>Menu</h3>
      <div className="menu-list">
        {filteredFoods.length > 0 ? (
          filteredFoods.map(food => (
            <div key={food._id} className="menu-item">
              <img src={`${url}/uploads/${food.image}`} alt={food.name} />
              <h3>{food.name}</h3>
              <p>₦{food.price}</p>
            </div>
          ))
        ) : (
          <p>No menu items available.</p>
        )}
      </div>
      <h3>Address</h3>
      <p>{address || 'Address not available'}</p>
      <h3>Operating Hours:</h3>
      <p>{operating_hours || 'Hours not available'}</p>
      <h3>Operating Days:</h3>
      <p>{operating_days || 'Days not available'}</p>
      <h3>Location:</h3>
      <p onClick={() => handleLocationClick(address)} style={{ cursor: 'pointer' }}>
        {address || 'Click to find location'}
      </p>
      {showPopup && selectedLocation && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setShowPopup(false)}>&times;</button>
            <h3>Location: {selectedLocation.address}</h3>
            <SimpleMap location={selectedLocation} />
          </div>
        </div>
      )}
    </div>
  );
}

export default RestDetails;
