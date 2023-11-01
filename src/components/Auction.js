import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useParams, Link } from 'react-router-dom';

const AuctionPage = () => {
  const [bidAmount, setBidAmount] = useState(0);
  const [socket, setSocket] = useState(null);
  const [currentBid, setCurrentBid] = useState(100);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [product, setProduct] = useState(null); // Define the product state

  const { productId } = useParams();

  useEffect(() => {
    if (!productId) {
      return;
    }

    fetch(`http://localhost:8080/fetchSingleProducts/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data); // Update the product state with the fetched data
        setCurrentBid(data.initialBid); // Set the initial bid based on the product data
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]); // Add productId as a dependency for the useEffect

  useEffect(() => {
    if (!productId) {
      return;
    }

    const newSocket = io('http://localhost:8080');

    newSocket.on('connect', () => {
      console.log('Connected to the Socket.io server');
      // When connected, join the chat room for the specific product
      newSocket.emit('joinRoom', productId);
    });

    newSocket.on('newChatMessage', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('newBid', (newBid) => {
      const bidAmount = newBid.bidAmount;
      const user = newBid.email;
setCurrentBid(bidAmount)
      // Display the bid details in the chat box
      alert(`new bid by ${user} of ${bidAmount}`)
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [productId]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit('bid', { bidAmount, email: localStorage.getItem('email') });
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (socket && newMessage.trim() !== '') {
      socket.emit('chatMessage', { message: newMessage, email: localStorage.getItem('email'), roomId: productId });
      setNewMessage('');
    }
  };

  return (
    <div className="auction-container">
     <h2>Live Auctions</h2>
      <input
        type="text"
        placeholder="Search for any product or item"
        // Implement your search functionality here
      />
      {productId ? ( // Check if productId is not empty
        <h2>Live Auctions</h2>
      ) : (
        <div>
          <p>Participate in Auction</p><br/>
          <Link to="/products">
            <button>Go to Products</button>
          </Link>
        </div>
      )}
      {product && productId ? ( // Check if product is available and productId is not empty
        <div className="auction-card">
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <img src={`http://localhost:8080/images/${product.imageUrl}`} alt={`Product ${product.name}`} />
          <div className="current-bid">Current Bid: ${currentBid}</div>
          <form onSubmit={handleBidSubmit}>
            <input
              type="number"
              placeholder="Your Bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(parseInt(e.target.value, 10))}
            />
            <button type="submit">Place Bid</button>
          </form>
        </div>
      ) : null}

      <div className="chat-box">
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className="chat-message">
            {message.message} ({message.email})
            </div>
          ))}
        </div>
        {product && productId ? (
      <form onSubmit={handleChatSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    ) : null}
      </div>
    </div>
  );
};

export default AuctionPage;
