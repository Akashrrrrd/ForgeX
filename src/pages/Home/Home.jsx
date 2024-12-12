import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import forgex_logo from '../../assets/forgex_logo.png';

const Home = () => {
  const navigate = useNavigate();
  const [menuHovered, setMenuHovered] = useState(null);

  // Game menu options
  const menuOptions = [
    { 
      id: 'multiplayer', 
      label: 'Multiplayer', 
      description: 'Join global strategic battles' 
    },
    { 
      id: 'campaign', 
      label: 'Campaign', 
      description: 'Embark on epic AI-driven missions' 
    },
    { 
      id: 'training', 
      label: 'Training Ground', 
      description: 'Sharpen your strategic skills' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      description: 'Customize your ForgeX experience' 
    }
  ];

  // Handle menu item selection
  const handleMenuSelect = (option) => {
    switch(option) {
      case 'multiplayer':
        navigate('/multiplayer');
        break;
      case 'campaign':
        navigate('/campaign');
        break;
      case 'training':
        navigate('/training');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        break;
    }
  };

  return (
    <div className="game-home-container">
      <div className="game-home-overlay"></div>
      
      <div className="game-home-content">
        {/* Game Logo */}
        <div className="game-home-logo-container">
          <img 
            src={forgex_logo} 
            alt="ForgeX Logo" 
            className="game-home-logo" 
          />
          <h1 className="game-home-title">FORGE X</h1>
        </div>

        {/* Game Menu */}
        <div className="game-home-menu">
          {menuOptions.map((option) => (
            <div 
              key={option.id}
              className={`game-menu-item ${menuHovered === option.id ? 'hovered' : ''}`}
              onClick={() => handleMenuSelect(option.id)}
              onMouseEnter={() => setMenuHovered(option.id)}
              onMouseLeave={() => setMenuHovered(null)}
            >
              <span className="menu-item-label">{option.label}</span>
              <span className="menu-item-description">
                {option.description}
              </span>
            </div>
          ))}
        </div>

        {/* Version and Additional Info */}
        {/* <div className="game-home-footer">
          <span>ForgeX v1.0.0 | Build 2024.1</span>
        </div> */}
      </div>
    </div>
  );
};

export default Home;