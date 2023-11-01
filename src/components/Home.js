import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Extract the token from local storage
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);

    // Check the user's authentication status when the component mounts
    if (storedToken) {
      try {
        // Replace this with your authentication status check API endpoint
        fetch('http://localhost:8080/auth', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + storedToken, // Use 'Bearer' and add a space before the token
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (response.ok) {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
          })
          .catch((error) => {
            console.error('Authentication status check failed:', error);
          });
      } catch (error) {
        console.error('Authentication status check failed:', error);
      }
    }
  }, []);

  // Function to handle sign-out
  const handleSignOut = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
    // Set the isLoggedIn state to false
    setIsLoggedIn(false);
  };

  return (
    <div className="home-container">
      <header>
        <nav>
          <div className="logo">Your Logo</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {isLoggedIn ? (
              <li><Link to="/login" onClick={handleSignOut}>Sign Out</Link></li>
            ) : (
              <li><Link to="/login">Sign In</Link></li>
            )}
            <li><Link to="/Products">Products</Link></li>
            <li><Link to="/Auction">Auction</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <h1>Welcome to Your Marketplace</h1>
          <p>Discover and bid on unique items.</p>
          <Link to="/login" className="cta-button">Get Started</Link>
        </section>
        <section className="featured-products">
          <h2>Featured Products</h2>
          {/* Add featured product listings here */}
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Your Marketplace</p>
      </footer>
    </div>
  );
}

export default HomePage;
