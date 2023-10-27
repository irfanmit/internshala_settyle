import React from 'react';
import '../App.css'; // Import your CSS file

const AuctionPage = () => {
  return (
    <div className="auction-container">
      <h2>Live Auctions</h2>
      <div className="auction-list">
        {/* Add live auction listings here */}
        <div className="auction-card">
          <img src="auction-item-image-1.jpg" alt="Auction Item 1" />
          <h3>Auction Item 1</h3>
          <p>Description of Auction Item 1</p>
          <div className="current-bid">Current Bid: $100</div>
          <button className="place-bid-button">Place Bid</button>
        </div>
        <div className="auction-card">
          <img src="auction-item-image-2.jpg" alt="Auction Item 2" />
          <h3>Auction Item 2</h3>
          <p>Description of Auction Item 2</p>
          <div className="current-bid">Current Bid: $150</div>
          <button className="place-bid-button">Place Bid</button>
        </div>
        {/* Add more auction cards as needed */}
      </div>
    </div>
  );
}

export default AuctionPage;
