import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (!userInput.trim()) {
      alert("Please enter a message before generating.");
      return;
    }

    navigate("/chat", { state: { userMessage: userInput } });
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">STYLUX</div>
        <div className="nav-links">
          <a href="/" className="nav-item">Home</a>
          <a href="/login" className="nav-item">Login</a>
          <a href="/signup" className="nav-item">Sign up</a>
          <a href="/try" className="nav-item try-free">Try for free</a>
        </div>
      </nav>

      <div className="hero-section">
        <h1>
          The <span className="highlight">fastest</span> way to get trendy collections with
        </h1>
        <h2 className="brand-name">STYLUX AI</h2>
        <div className="chat-input-box">
          <span className="plus-icon">+</span>
          <input
            type="text"
            placeholder="Message STYLUX"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="generate-btn" onClick={handleGenerate}>
            Generate
          </button>
        </div>
        <p className="privacy-text">
          By clicking "Generate" you agree to generate. <a href="#">Privacy Notice</a>
        </p>
      </div>
    </div>
  );
}

export default Home;
