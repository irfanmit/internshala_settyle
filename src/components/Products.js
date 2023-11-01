import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    image: null, // Image file
  });

  const [productAdded, setProductAdded] = useState(false);

  const [products, setProducts] = useState([]); // Change the state variable name

  useEffect(() => {
    const fetchData = async () => { // Define an async function
      try {
        const response = await fetch('http://localhost:8080/getProducts');
        // console.log(response.products);
        if (response.ok) {
          const productData = await response.json();
          console.log(productData);
          setProducts(productData); // Update the state variable
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData(); // Call the async function
  }, [productAdded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductData({ ...productData, image: imageFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('image', productData.image); // Add the image

      const response = await fetch('http://localhost:8080/addProducts', {
        method: 'POST',
        body: formData, // Use the FormData object
      });

      if (response.ok) {
        setProductData({
          name: '',
          description: '',
          price: 0,
          image: null, // Reset image
        });
        // alert('Product added successfully!');
        setProductAdded(!productAdded)
      } else {
        alert('Failed to add the product.');
      }
    } catch (error) {
      console.error('Error adding the product:', error);
    }
  };

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="product-list">
        <div className="product-form">
          <h3>Add a Product</h3>
          <form onSubmit={handleSubmit}>
            <label>Name:
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
              />
            </label>
            <label>Description:
              <input
                type="text"
                name="description"
                value={productData.description}
                onChange={handleChange}
              />
            </label>
            <label>Price:
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
              />
            </label>
            <label>Image:
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
              />
            </label>
            <button type="submit">Add Product</button>
          </form>
        </div>
        {/* Existing product listings */}
        {/* ... */}
        <div className="product-listings">
          {/* Map through the products and render each one */}
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <img src={`http://localhost:8080/images/${product.imageUrl}`} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <Link to={`/Auction/${product._id}`}>View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
