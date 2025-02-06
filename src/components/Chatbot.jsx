import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chatbot.css";

function Chatbot() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarHistory, setSidebarHistory] = useState([]); // Sidebar message history
  const chatEndRef = useRef(null);

  // Scroll to the bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: "user", text: userInput, timestamp: new Date().toLocaleTimeString() };
    setChatHistory([...chatHistory, newMessage]);
    setSidebarHistory([...sidebarHistory, userInput]); // Add message to sidebar history
    setUserInput("");

    try {
      const response = await axios.post("http://localhost:5000/api/recommend", { message: userInput });
      const botMessage = { sender: "bot", text: response.data.reply, timestamp: new Date().toLocaleTimeString() };
      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { sender: "bot", text: "Sorry, I couldn't process that request.", timestamp: new Date().toLocaleTimeString() };
      setChatHistory((prevHistory) => [...prevHistory, errorMessage]);
    }
  };

  // Function to re-use a previous question from the sidebar
  const handleSidebarClick = (message) => {
    setUserInput(message);
  };

  return (
    <div className="main-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">STYLUX</div>
        <div className="menu-item">💬 Explore STYLUX</div>

        {/* Sidebar Chat History */}
        <div className="history-header">🕑 Recent Queries</div>
        <div className="sidebar-history">
          {sidebarHistory.map((msg, index) => (
            <div key={index} className="sidebar-item" onClick={() => handleSidebarClick(msg)}>
              {msg.length > 30 ? `${msg.substring(0, 30)}...` : msg} {/* Shorten long messages */}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <div className="chat-container">
        <div className="chat-header">
          <button className="free-trial-button">Try for free</button>
        </div>

        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
              <div className="message-time">{msg.timestamp}</div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        {/* Input Section */}
        <div className="chat-input">
          <button className="browse-btn">➕ Browse</button>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Message STYLUX"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="generate-btn">Generate</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
