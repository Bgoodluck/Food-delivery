import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

function Login({setShowLogin}) {
  const {url, setToken} = useContext(StoreContext)
  const [curState, setCurState] = useState("Login")
  const [error, setError] = useState("")

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
    }
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [addressField]: value
        }
      }));
    } else {
      setData(prevData => ({ ...prevData, [name]: value }));
    }
  }

  const onLogin = async (event) => {
    event.preventDefault()
    setError("")
    
    let newUrl = `${url}/api/user/${curState === "Login" ? "login" : "register"}`

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
        if (curState === "Sign Up") {
          toast.success("Registration successful!");
        }
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }
   
  return (
    <div className='login'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{curState}</h2>
          <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
          {curState !== "Login" && (
            <>
              <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Name and Surname' required />
              <input name='address.street' onChange={onChangeHandler} value={data.address.street} type="text" placeholder='Street' required />
              <input name='address.city' onChange={onChangeHandler} value={data.address.city} type="text" placeholder='City' required />
              <input name='address.state' onChange={onChangeHandler} value={data.address.state} type="text" placeholder='State' required />
              <input name='address.country' onChange={onChangeHandler} value={data.address.country} type="text" placeholder='Country' required />
            </>
          )}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
          <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type='submit'>{curState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {curState === "Login" 
          ? <p>Create a new account? <span onClick={()=> setCurState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={()=> setCurState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default Login