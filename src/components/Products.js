import React from 'react';
import '../App.css'; // Import your CSS file

const ProductsPage = () => {
  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="product-list">
        {/* Add product listings here */}
        <div className="product-card">
          <img src="product-image-1.jpg" alt="Product 1" />
          <h3>Product 1</h3>
          <p>Description of Product 1</p>
          <button className="buy-button">Buy Now</button>
        </div>
        <div className="product-card">
          <img src="product-image-2.jpg" alt="Product 2" />
          <h3>Product 2</h3>
          <p>Description of Product 2</p>
          <button className="buy-button">Buy Now</button>
        </div>
        {/* Add more product cards as needed */}
      </div>
    </div>
  );
}

export default ProductsPage;
