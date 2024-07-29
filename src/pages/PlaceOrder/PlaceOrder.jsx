import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  // to confirm if registered user wants to use their registered address or not
  const [useRegisteredAddress, setUseRegisteredAddress] = useState(true);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    phone: "",
    state: "",
    country: "",
    description: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (orderData) => {
    
    try {
      const response = await axios.post(`${url}/api/place-order`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const order = response.data.order;
        return order;
      } else {
        throw new Error(response.data.message || 'Order placement failed');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  };

  const createPaymentLink = async (paymentData) => {
    try {
      const response = await axios.post(`${url}/api/create-payment-link`, paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const paymentLink = response.data.link;
        window.location.href = paymentLink; // Redirect me to Flutterwave payment page
      } else {
        throw new Error(response.data.message || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('Error creating payment link:', error);
      throw error;
    }
  };

  const handlePlaceOrderAndPayment = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const infoData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    };

    let orderData = {
      useRegisteredAddress,
      infoData,
      userId: token, 
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      address: useRegisteredAddress ? null : {
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
      },
    };

    let paymentData = {
      amount: getTotalCartAmount() + 2,
      email: data.email,
      phone: data.phone,
      name: `${data.firstName} ${data.lastName}`,
    };

    try {
      const order = await placeOrder(orderData);
      paymentData.orderId = order._id;
      await createPaymentLink(paymentData);
    } catch (error) {
      console.error('Error handling order and payment:', error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, navigate, getTotalCartAmount]);

  return (
    <form onSubmit={handlePlaceOrderAndPayment} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        
        <div className="address-section">
          {token && (
            <div className="address-choice">
              <label>
                <input
                  type="radio"
                  name="addressChoice"
                  checked={useRegisteredAddress}
                  onChange={() => setUseRegisteredAddress(true)}
                />
                <span>Registered address</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="addressChoice"
                  checked={!useRegisteredAddress}
                  onChange={() => setUseRegisteredAddress(false)}
                />
                <span>New address</span>
              </label>
            </div>
          )}
          
          {(!token || !useRegisteredAddress) && (
            <>
              <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
              <div className="multi-fields">
                <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
                <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
              </div>
              <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
            </>
          )}
        </div>
        
        <input required name='description' onChange={onChangeHandler} value={data.description} type="text" placeholder='Description' />
      </div>
      
      <div className="place-order-right">
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
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;

