import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import forgex_logo from "../../assets/forgex_logo.png";

const Home = () => {
  const [menuHovered, setMenuHovered] = useState(null);

  // Game menu options
  const menuOptions = [
    {
      id: "multiplayer",
      label: "Multiplayer",
      description: "Join global strategic battles",
      path: "/multiplayer",
    },
    {
      id: "campaign",
      label: "Campaign",
      description: "Embark on epic AI-driven missions",
      path: "/campaign",
    },
    {
      id: "training",
      label: "Training Ground",
      description: "Sharpen your strategic skills",
      path: "/training",
    },
    {
      id: "settings",
      label: "Settings",
      description: "Customize your ForgeX experience",
      path: "/settings",
    },
  ];

  return (
    <div className="game-home-container">
      <div className="game-home-overlay"></div>

      <div className="game-home-content">
        {/* Game Logo */}
        <div className="game-home-logo-container">
          <img src={forgex_logo} alt="ForgeX Logo" className="game-home-logo" />
          <h1 className="game-home-title">FORGE X</h1>
        </div>

        {/* Game Menu */}
        <div className="game-home-menu">
          {menuOptions.map((option) => (
            <Link
              to={option.path}
              key={option.id}
              className={`game-menu-item ${
                menuHovered === option.id ? "hovered" : ""
              }`}
              onMouseEnter={() => setMenuHovered(option.id)}
              onMouseLeave={() => setMenuHovered(null)}
            >
              <span className="menu-item-label">{option.label}</span>
              <span className="menu-item-description">
                {option.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
