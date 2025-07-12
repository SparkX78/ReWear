// client/src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL || 'https://rewear-backend.onrender.com/')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage('⚠️ Error connecting to backend'));

    fetch((process.env.REACT_APP_API_URL || 'https://rewear-backend.onrender.com') + '/api/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('❌ Failed to fetch items:', err));
  }, []);

  return (
    <div className="container">
      <header className="hero">
        <h1>👕 ReWear</h1>
        <p>Community Clothing Exchange for Sustainable Fashion</p>
        <p className="status">{message}</p>
      </header>

      <section className="items-section">
        <h2>Available Clothing Items</h2>
        {items.length === 0 ? (
          <p className="empty">🧺 No items to display. Be the first to list!</p>
        ) : (
          <div className="item-grid">
            {items.map((item, i) => (
              <div key={i} className="item-card">
                <h4>{item.title}</h4>
                <p>Category: {item.category || 'N/A'}</p>
                <button>Request Swap</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
