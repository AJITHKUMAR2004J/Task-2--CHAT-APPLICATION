import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = () => {
    socket.emit('send_message', { message });
    setChat([...chat, { message, self: true }]);
    setMessage('');
  };

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, { message: data.message, self: false }]);
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Real-Time Chat App</h2>
      <div>
        {chat.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.self ? 'right' : 'left' }}>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
