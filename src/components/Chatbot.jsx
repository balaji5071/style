import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./chatbot.css";

function Chatbot() {
  const location = useLocation();
  const [userInput, setUserInput] = useState(location.state?.userMessage || "");
  const [chatHistory, setChatHistory] = useState([]);
  const chatEndRef = useRef(null);
  const [firstMessageSent, setFirstMessageSent] = useState(false); // Track first message status

  // Scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // Automatically send the first message when the page loads
  useEffect(() => {
    if (userInput && !firstMessageSent) {
      handleSendMessage(userInput);
      setFirstMessageSent(true); // Ensure it doesn't trigger again
    }
  }, [userInput, firstMessageSent]);

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    const newMessage = { sender: "user", text: message, timestamp: new Date().toLocaleTimeString() };
    setChatHistory((prevHistory) => [...prevHistory, newMessage]);
    setUserInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/recommend", {
        skinTone: "fair",  // Replace these with actual user inputs
        shade: "warm",
        style: "casual",
        gender: "male",
      });

      const botMessage = { sender: "bot", text: response.data.recommendation, timestamp: new Date().toLocaleTimeString() };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setChatHistory((prevHistory) => [...prevHistory, {
        sender: "bot",
        text: "Sorry, I couldn't process that request.",
        timestamp: new Date().toLocaleTimeString(),
      }]);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">💬 STYLUX AI Chat</div>
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <div className="message-content">{msg.text}</div>
            <div className="message-time">{msg.timestamp}</div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask me for outfit recommendations..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage(userInput)}
        />
        <button onClick={() => handleSendMessage(userInput)}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;
