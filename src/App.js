import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import HomePage from './components/Home';
import AuctionPage from './components/Auction';
import ProductsPage from './components/Products';
import Register from './components/Register';


const App = () => {
  return (
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Auction" element={<AuctionPage />} />
        <Route path="/Products" element={<ProductsPage />} />
        <Route path="/signup" element={<Register/>}/> 
      </Routes>
   
  );
}

export default App;
