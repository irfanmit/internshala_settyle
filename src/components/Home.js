import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header>
        <nav>
          <div className="logo">Your Logo</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/Products">Products</Link></li>
            <li><Link to="/Auction">Auction</Link></li>
            <li><Link to="/signup" >Signup</Link></li>
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
