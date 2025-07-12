// client/src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Check backend connectivity
    fetch(process.env.REACT_APP_API_URL || 'https://rewear-backend.onrender.com/')
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(err => setMessage('Error connecting to backend'));

    // Fetch some sample items from API
    fetch((process.env.REACT_APP_API_URL || 'https://rewear-backend.onrender.com') + '/api/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Failed to fetch items:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>👕 ReWear – Community Clothing Exchange</h1>
      <p>{message}</p>

      <h2>Available Clothing Items:</h2>
      {items.length === 0 ? (
        <p>No items to display.</p>
      ) : (
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
