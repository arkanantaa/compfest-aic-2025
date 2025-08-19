import React from 'react';

// SVG untuk ikon kirim
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);


function AIChat() {
  return (
    <div className="card">
      <h3>AirSense AI Assistant</h3>
      <div className="chat-intro">
        <p>Hello! I am your AirSense AI Assistant. How can I help you with air quality questions today?</p>
      </div>
      <div className="chat-log">
        <div className="chat-message user">
          <p>What is PM2.5 and why is it harmful?</p>
        </div>
        <div className="chat-message ai">
          <p>PM2.5 refers to fine particulate matter, tiny airborne particles 2.5 micrometers or less in diameter. They are harmful because their small size allows them to penetrate deep into the lungs and even enter the bloodstream, potentially causing respiratory and cardiovascular issues.</p>
        </div>
        <div className="chat-message user">
          <p>What are the best plants to improve indoor air quality?</p>
        </div>
        <div className="chat-message ai">
          <p>Some popular houseplants that can help improve indoor air quality include Snake Plant, Spider Plant, Peace Lily, and Boston Fern. They are known to absorb common indoor pollutants.</p>
        </div>
      </div>
      <div className="chat-input-container">
        <input type="text" placeholder="Type your question about air quality..." />
        <button className="send-button"><SendIcon /></button>
      </div>
    </div>
  );
}

export default AIChat;