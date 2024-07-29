const [restaurants, setRestaurants] = useState([]);
  
useEffect(() => {
  
  fetch(url + '/api/restaurants/list')
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setRestaurants(data.data);
      } else {
        console.error('Error fetching restaurants:', data.message);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);

<div className="restaurant-list">
      {restaurants.length > 0 ? (
        <div className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <div key={restaurant._id} className="restaurant-card">
              <img
                src={`/uploads/${restaurant.image}`}
                alt={restaurant.name}
                className="restaurant-image"
              />
              <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-address">{restaurant.address}</p>
                <p className="restaurant-operating-hours">{restaurant.operating_hours}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No restaurants available.</p>
      )}
    </div>