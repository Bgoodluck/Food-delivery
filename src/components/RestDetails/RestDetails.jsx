import React, { useState, useEffect, useCallback, useContext } from 'react';
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

function RestDetails({ restaurant }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const { url } = useContext(StoreContext);

  useEffect(() => {
    console.log('Component re-rendered');
    console.log('Selected Location:', selectedLocation);
    console.log('Show Popup:', showPopup);
  });

  const handleLocationClick = useCallback(async (address) => {
    console.log('Clicked address:', address);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await response.json();
      console.log('Nominatim response:', data);
      if (data.length > 0) {
        const newLocation = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          address: address
        };
        console.log('Setting new location:', newLocation);
        setSelectedLocation(newLocation);
        setShowPopup(true);
      } else {
        console.log('No location data found');
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
    console.log('No restaurant data');
    return null;
  }

  console.log('Restaurant data:', restaurant);

  const { name, image, address, operating_hours, operating_days, menu } = restaurant;

  return (
    <div className="rest-details">
      <h2>{name}</h2>
      <img src={`${url}/uploads/${image}`} alt={name} className="restaurant-image" />
      <h3>Menu</h3>
      <p>{menu}</p>
      <h3>Address</h3>
      <p>{address}</p>
      <h3>Operating Hours:</h3>
      <p>{operating_hours}</p>
      <h3>Operating Days:</h3>
      <p>{operating_days}</p>
      <h3>Location:</h3>
      <p onClick={() => handleLocationClick(address)} style={{ cursor: 'pointer' }}>
        {address}
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





