import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [restaurant_list, setRestaurantList] = useState([]); 
    const url = "http://localhost:4000";
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userProfile, setUserProfile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    
    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    setToken('');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
                return Promise.reject(error);
            }
        );
    }, [token]);

    const addToCart = async (itemId) => {
        let updatedCart;
        if (!cartItems[itemId]) {
            updatedCart = { ...cartItems, [itemId]: 1 };
        } else {
            updatedCart = { ...cartItems, [itemId]: cartItems[itemId] + 1 };
        }
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error adding to cart on backend:", error);
            }
        }
    };

    const removeCartItem = async (itemId) => {
        const updatedCart = { ...cartItems, [itemId]: cartItems[itemId] - 1 };
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);

        if (token) {
            try {
                await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
            } catch (error) {
                console.error("Error removing from cart on backend:", error);
            }
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const fetchRestaurantList = async () => { 
        try {
            const response = await axios.get(url + "/api/restaurant/list");
            console.log('Fetched restaurant list:', response.data)
            setRestaurantList(response.data.data);
        } catch (error) {
            console.error("Error fetching restaurant list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
            updateLocalStorage(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const getUserProfile = async () => {
        try {
            const response = await axios.get(url + "/api/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserProfile(response.data.profile);
            console.log("Fetched user profile:", response.data.profile);
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    };
    
    const updateUserProfile = async (profileData) => {
        try {
            setError(null);
            setSuccess(false);
            const response = await axios.post(url + "/api/profile/update", profileData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserProfile(response.data.profile);
            setSuccess(true);
        } catch (error) {
            console.error("Error updating user profile:", error);
            setError("Failed to update profile. Please try again.");
        }
    };


    useEffect(() => {
        async function loadData() {
           
            const storedCartItems = localStorage.getItem('cartItems');
            if (storedCartItems) {
                try {
                    setCartItems(JSON.parse(storedCartItems));
                } catch (error) {
                    console.error("Error parsing cart items from localStorage:", error);
                    setCartItems([]); 
                }
            }

            await fetchFoodList();
            await fetchRestaurantList(); 
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
                await getUserProfile();
            }
        }
        loadData();
    }, []);

    const handleCheckout = async (amount, currency) => {
        try {
            const res = await axios.post(url + "/api/order/placeorder", {
                method: "POST",
                headers: {
                          "Content-Type": "application/json",
                          token
                        },
                    body: JSON.stringify({ amount, currency })
                });

                const data = await res.data;
                if (res.status === 200) {
                    window.location.href = data.link;  
                } else {
                    console.error(data.msg || "Failed to Initiate Payment");
                }
        } catch (error) {
            console.error(error);
        }
    };

    const contextValue = {
        food_list,
        restaurant_list, 
        addToCart,
        removeCartItem,
        cartItems,
        setCartItems,
        getTotalCartAmount,
        url,
        token,
        setToken,
        handleCheckout,
        fetchRestaurantList,
        getUserProfile,
        userProfile,
        updateUserProfile,
        error,
        success,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;



