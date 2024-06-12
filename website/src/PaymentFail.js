


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FailurePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={styles.container}>

      <h1 style={styles.message}>Unfortunately, your payment was not successful. Please try again.</h1>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#C80036',
  },
  message: {
    fontSize: '24px',
    color: '#4caf50',
  },
};

export default FailurePage;
