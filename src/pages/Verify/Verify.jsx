import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function Verify() {
  const [verificationStatus, setVerificationStatus] = useState('Verifying payment...');
  const {url} = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const transaction_id = params.get('transaction_id');
      const tx_ref = params.get('tx_ref');

      try {
        const response = await axios.get(`${url}/api/place-order/verify?transaction_id=${transaction_id}&tx_ref=${tx_ref}`);
        if (response.data.success) {
          setVerificationStatus('Payment verified successfully!');
          
          
          setTimeout(() => navigate('/myorders'), 2000);
        } else {
          setVerificationStatus('Payment verification failed. Please contact support.');
          navigate("/");
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('An error occurred during verification. Please contact support.');
      }
    };

    verifyPayment();
  }, [location]);

  return (
    <div>
      <h2>{verificationStatus}</h2>
      <div className='verify'>
         <div className="spinner"></div>
          <p>Verifying your payment...</p>
      </div>
    </div>
  );
}

export default Verify;