import React, { useState, useEffect, useRef } from "react";
import {
  User,
  Users,
  GamepadIcon,
  Settings,
  Copy,
  RefreshCcw,
  Lock,
  Unlock,
  Star,
  Trophy,
  Shield,
  Zap,
} from "lucide-react";
import "./Multiplayer.css";

const Multiplayer = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [playerCount, setPlayerCount] = useState(0);
  const [gameMode, setGameMode] = useState("classic");
  const [playerLevel, setPlayerLevel] = useState(1);
  const [playerXP, setPlayerXP] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Particle effect refs
  const particleContainerRef = useRef(null);

  // Generate a random avatar when component mounts
  useEffect(() => {
    generateRandomAvatar();
    createParticleBackground();
  }, []);

  // Particle background animation
  const createParticleBackground = () => {
    const container = particleContainerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random starting position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;

      // Random size
      const size = Math.random() * 5 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random color (blue/purple spectrum)
      const hue = Math.random() * 60 + 240;
      particle.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.7)`;

      container.appendChild(particle);

      // Animate particle
      particle.animate(
        [
          { transform: "translate(0, 0)", opacity: 1 },
          {
            transform: `translate(${(Math.random() - 0.5) * 200}px, 100vh)`,
            opacity: 0,
          },
        ],
        {
          duration: Math.random() * 3000 + 2000,
          easing: "linear",
          fill: "forwards",
        }
      );

      // Remove particle after animation
      setTimeout(() => {
        container.removeChild(particle);
        createParticle();
      }, 5000);
    };

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      createParticle();
    }
  };

  const generateRandomAvatar = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    setAvatarUrl(
      `https://api.dicebear.com/8.x/pixel-art/svg?seed=${randomNumber}`
    );
  };

  const handleCreateRoom = () => {
    const newRoomCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
    setRoomCode(newRoomCode);
    navigator.clipboard.writeText(newRoomCode);

    // Simulated room creation with player count
    setPlayerCount(1);

    // Add an achievement
    const newAchievement = {
      id: Date.now(),
      icon: <Trophy size={16} />,
      title: "Room Creator",
      description: "Successfully created a multiplayer room",
    };
    setAchievements((prev) => [...prev, newAchievement]);
  };

  const handleJoinRoom = () => {
    if (roomCode && username) {
      // Simulated room joining logic
      setPlayerCount((prevCount) => prevCount + 1);

      // Increase XP
      const newXP = playerXP + 50;
      setPlayerXP(newXP);

      // Level up system
      if (newXP >= 100 * playerLevel) {
        setPlayerLevel((prev) => prev + 1);

        // Add level up achievement
        const newAchievement = {
          id: Date.now(),
          icon: <Zap size={16} />,
          title: `Level ${playerLevel + 1} Unlocked`,
          description: "Reached a new player level",
        };
        setAchievements((prev) => [...prev, newAchievement]);
      }

      alert(`Joined room ${roomCode} successfully!`);
    } else {
      alert("Please enter a username and room code.");
    }
  };

  const toggleGameMode = () => {
    const modes = ["classic", "hardcore", "tournament"];
    const currentIndex = modes.indexOf(gameMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setGameMode(nextMode);
  };

  return (
    <div className="mp-container">
      <div ref={particleContainerRef} className="particle-background"></div>
      <div className="mp-content">
        <div className="mp-header">
          <GamepadIcon size={50} className="mp-game-icon" />
          <h1 className="mp-title">Multiplayer Lobby</h1>
          <p className="mp-subtitle">Connect, Compete, Conquer!</p>
        </div>

        {/* Player Profile Section */}
        <div className="mp-profile-section">
          <div className="mp-avatar-container">
            <img
              src={avatarUrl}
              alt="Player Avatar"
              className="mp-avatar"
              onClick={generateRandomAvatar}
            />
            {/* <div className="mp-avatar-hover">
              <RefreshCcw size={20} />
              <span>Change Avatar</span>
            </div> */}
          </div>

          <input
            type="text"
            className="mp-username-input"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={15}
          />

          {/* Player Stats */}
          <div className="mp-player-stats">
            <div className="mp-level">
              <Shield size={16} /> Level {playerLevel}
            </div>
            <div className="mp-xp">
              <Star size={16} /> XP: {playerXP}
            </div>
          </div>
        </div>

        {/* Game Mode Selection */}
        <div className="mp-game-mode">
          <button className="mp-mode-btn" onClick={toggleGameMode}>
            Game Mode: {gameMode.toUpperCase()}
          </button>
        </div>

        {/* Room Actions */}
        <div className="mp-room-actions">
          <button className="mp-create-btn" onClick={handleCreateRoom}>
            <Users className="btn-icon" />
            Create Room
          </button>

          <button
            className="mp-join-btn"
            onClick={() => setShowJoinForm(!showJoinForm)}
          >
            <User className="btn-icon" />
            Join Room
          </button>
        </div>

        {/* Join Room Form */}
        {showJoinForm && (
          <div className="mp-join-form">
            <div className="mp-room-input-container">
              <input
                type="text"
                className="mp-room-input"
                placeholder="Enter room code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                maxLength={8}
              />
            </div>

            <button
              className="mp-submit-btn"
              onClick={handleJoinRoom}
              disabled={!roomCode || !username}
            >
              Join Game
            </button>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mp-achievements">
            <h3>Recent Achievements</h3>
            <div className="mp-achievement-list">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="mp-achievement-item">
                  {achievement.icon}
                  <div>
                    <strong>{achievement.title}</strong>
                    <p>{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multiplayer;
