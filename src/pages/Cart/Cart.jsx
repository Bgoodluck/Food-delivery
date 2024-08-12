import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
    const { cartItems, food_list, addToCart, removeCartItem, deleteCartItem, getTotalCartAmount, url } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleRemoveCartItem = (id, name) => {
      deleteCartItem(id); 
      toast.error(`${name} removed from cart!`);
  };

    const handleAddItem = (id) => {
        addToCart(id);
        toast.success('quantity increased in cart!');
    };

    const handleReduceItem = (id) => {
        if (cartItems[id] > 1) {
            
            removeCartItem(id);
            toast.error(`${name} quantity reduced from cart!`);
        } else {
            
            handleRemoveCartItem(id, food_list.find(item => item._id === id).name);
        }
    };

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Actions</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url + "/images/" + item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>₦{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>₦{item.price * cartItems[item._id]}</p>
                                    <div className='cart-item-actions'>
                                        <button onClick={() => handleReduceItem(item._id)}>-</button>
                                        <button onClick={() => handleAddItem(item._id)}>+</button>
                                        <button onClick={() => handleRemoveCartItem(item._id, item.name)} className='cross'>x</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-detail">
                            <p>Subtotal</p>
                            <p>₦{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-detail">
                            <p>Delivery Fee</p>
                            <p>₦{getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-detail">
                            <b>Total</b>
                            <b>₦{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className='cart-promocode-input'>
                            <input type="text" placeholder='promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Cart;
