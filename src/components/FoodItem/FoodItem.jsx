import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function FoodItem({id, name, price, description, image, restaurant}) {

    // const [itemCount, setItemCount] = useState(0)
    const {cartItems, addToCart, removeCartItem, url} = useContext(StoreContext)


    const handleAddToCart = (id) => {
      addToCart(id);
      toast.success(`${name} added to cart!`);
    };
  
    const handleRemoveCartItem = (id) => {
      removeCartItem(id);
      toast.error(`${name} removed from cart!`);
    };



  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url + "/images/" + image} alt="" />
        {!cartItems[id] ? (
          <img className='add' onClick={() => handleAddToCart(id)} src={assets.add_icon_white} alt="" />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => handleRemoveCartItem(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={() => handleAddToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-description">{description}</p>
        <p className="food-item-restaurant">{restaurant}</p>
        <p className="food-item-price">₦{price}</p>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={5000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />

    </div>
  );
}

export default FoodItem


