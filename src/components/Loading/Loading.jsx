import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loading.css';
import forgex_logo from '../../assets/forgex_logo.png';

const Loading = () => {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing');

  // Simulated loading stages
  const loadingStages = [
    'Initializing Game Environment',
    'Loading AI Strategists',
    'Configuring Multiplayer Networks',
    'Generating Tactical Terrains',
    'Synchronizing Game Mechanics'
  ];

  useEffect(() => {
    let progress = 0;
    let stageIndex = 0;

    const progressInterval = setInterval(() => {
      progress += Math.random() * 15;
      
      if (progress > 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }

      // Update loading stage periodically
      if (progress > (stageIndex + 1) * 20 && stageIndex < loadingStages.length - 1) {
        stageIndex++;
        setLoadingStage(loadingStages[stageIndex]);
      }

      setLoadingProgress(Math.min(progress, 100));
    }, 300);

    return () => clearInterval(progressInterval);
  }, [navigate]);

  return (
    <div className="forgex-loading-container">
      <div className="loading-overlay"></div>
      
      <div className="loading-content">
        {/* Animated Logo */}
        <div className="loading-logo-container">
          <img 
            src={forgex_logo} 
            alt="ForgeX Logo" 
            className="loading-logo" 
          />
          <div className="loading-logo-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="loading-text-container">
          <h1 className="loading-title">FORGE X</h1>
          <p className="loading-stage">{loadingStage}</p>
        </div>

        {/* Progress Bar */}
        <div className="loading-progress-container">
          <div 
            className="loading-progress-bar" 
            style={{width: `${loadingProgress}%`}}
          ></div>
        </div>

        {/* Progress Percentage */}
        <div className="loading-percentage">
          {Math.round(loadingProgress)}%
        </div>
      </div>
    </div>
  );
};

export default Loading;