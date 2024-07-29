import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

function MyOrders() {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            console.log("Fetching orders with token:", token);
            const response = await axios.post(`${url}/api/order/user-orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("Full response:", response);
            if (response.data.success) {
                console.log("Order data:", response.data.data); 
                setData(response.data.data);
                setError(null);
            } else {
                setError(response.data.message || 'An error occurred while fetching orders');
            }
        } catch (error) {
            console.error('Error fetching orders:', error.response || error);
            setError(error.response?.data?.message || error.message || 'An error occurred while fetching orders');
            if (error.response?.status === 401) {
                console.log("User needs to login again");
                window.location.href = '/'; 
            }
        }
    };
    

    useEffect(() => {
        if (token) {
            fetchOrders();
        } else {
            setError("Please login to view your orders");
        }
    }, [token, url]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    console.log("Orders data in component:", data); 

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length > 0 ? (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => 
                                `${item.name} x ${item.quantity}${index === order.items.length - 1 ? '' : ', '}`
                            )}</p>
                            <p>₦{order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    ))
                ) : (
                    <p>No orders available</p>
                )}
            </div>
        </div>
    );
    
}

export default MyOrders

