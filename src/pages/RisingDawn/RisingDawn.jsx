import React, { useState, useEffect } from 'react';
import './RisingDawn.css';

const RisingDawn = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [gameProgress, setGameProgress] = useState({
    battlePrep: 0,
    heroLevel: 1,
    challengesCompleted: 0,
    reputation: 0
  });

  const features = [
    {
      id: 1,
      title: 'Battle Arena',
      description: 'Dynamic combat system with real-time strategic encounters',
      details: {
        difficulty: 'Challenging',
        rewardTier: 'Epic Loot',
        progressInfo: 'Unlock advanced combat techniques and rare weapons',
        currentProgress: () => `Combat Rank: ${gameProgress.battlePrep}/10`
      },
      action: () => {
        setGameProgress(prev => ({
          ...prev,
          battlePrep: Math.min(prev.battlePrep + 1, 10)
        }));
      }
    },
    {
      id: 2,
      title: 'Hero Forge',
      description: 'Deep character progression with multiple skill trees',
      details: {
        difficulty: 'Intricate',
        rewardTier: 'Legendary Upgrades',
        progressInfo: 'Evolve your hero\'s abilities and unlock unique specializations',
        currentProgress: () => `Hero Level: ${gameProgress.heroLevel}`
      },
      action: () => {
        setGameProgress(prev => ({
          ...prev,
          heroLevel: prev.heroLevel + 1
        }));
      }
    },
    {
      id: 3,
      title: 'Global Conflict',
      description: 'Persistent multiplayer world with faction warfare',
      details: {
        difficulty: 'Intense',
        rewardTier: 'Faction Dominance',
        progressInfo: 'Shape the world\'s political landscape through strategic conquests',
        currentProgress: () => `Reputation: ${gameProgress.reputation}/1000`
      },
      action: () => {
        setGameProgress(prev => ({
          ...prev,
          reputation: Math.min(prev.reputation + 50, 1000)
        }));
      }
    },
    {
      id: 4,
      title: 'Mystic Trials',
      description: 'Time-limited epic challenges with escalating complexity',
      details: {
        difficulty: 'Legendary',
        rewardTier: 'Mythic Artifacts',
        progressInfo: 'Conquer impossible missions and prove your ultimate mastery',
        currentProgress: () => `Challenges Completed: ${gameProgress.challengesCompleted}`
      },
      action: () => {
        setGameProgress(prev => ({
          ...prev,
          challengesCompleted: prev.challengesCompleted + 1
        }));
      }
    }
  ];

  return (
    <div className="rd-container">
      {/* Background Animation */}
      <div className="rd-background-animation">
        <div className="rd-star rd-star-1"></div>
        <div className="rd-star rd-star-2"></div>
        <div className="rd-star rd-star-3"></div>
        <div className="rd-glow"></div>
      </div>

      {/* Header */}
      <div className="rd-header">
        <h1 className="rd-title">Rising Dawn</h1>
        <p className="rd-subtitle">Forge Your Legendary Path</p>
      </div>

      {/* Game Progress Overview */}
      <div className="rd-game-progress">
        <div className="rd-progress-stat">
          <span>Hero Level:</span> {gameProgress.heroLevel}
        </div>
        <div className="rd-progress-stat">
          <span>Reputation:</span> {gameProgress.reputation}/1000
        </div>
        <div className="rd-progress-stat">
          <span>Challenges:</span> {gameProgress.challengesCompleted}
        </div>
      </div>

      {/* Features List */}
      <div className="rd-features-list">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`rd-feature-card ${
              selectedFeature === feature.id ? 'rd-selected' : ''
            }`}
            onClick={() => setSelectedFeature(feature.id)}
          >
            <h3 className="rd-feature-title">{feature.title}</h3>
            <p className="rd-feature-description">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Selected Feature Details */}
      {selectedFeature && (
        <div className="rd-feature-details">
          <h2 className="rd-detail-title">
            {
              features.find((feature) => feature.id === selectedFeature).title
            }
          </h2>
          <div className="rd-detail-info">
            {(() => {
              const selectedFeatureObj = features.find(
                (feature) => feature.id === selectedFeature
              );
              return (
                <>
                  <p className="rd-detail-description">
                    {selectedFeatureObj.description}
                  </p>
                  <div className="rd-feature-metadata">
                    <div className="rd-metadata-item">
                      <strong>Difficulty:</strong> {selectedFeatureObj.details.difficulty}
                    </div>
                    <div className="rd-metadata-item">
                      <strong>Reward Tier:</strong> {selectedFeatureObj.details.rewardTier}
                    </div>
                    <div className="rd-metadata-item">
                      <strong>Progress:</strong> {selectedFeatureObj.details.currentProgress()}
                    </div>
                    <p className="rd-progress-description">
                      {selectedFeatureObj.details.progressInfo}
                    </p>
                  </div>
                </>
              );
            })()}
          </div>
          <div className="rd-feature-actions">
            <button
              className="rd-start-button"
              onClick={() => {
                const selectedFeatureObj = features.find(
                  (feature) => feature.id === selectedFeature
                );
                selectedFeatureObj.action();
                alert('Feature progression updated!');
              }}
            >
              Engage Mission
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RisingDawn;