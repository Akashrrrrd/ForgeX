import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Target, ShieldCheck, Sparkles } from "lucide-react";
import "./Campaign.css";

const Campaign = () => {
  const [selectedMission, setSelectedMission] = useState(null);
  const [backgroundPosition, setBackgroundPosition] = useState({
    x: 50,
    y: 50,
  });
  const containerRef = useRef(null);

  // Sample campaign missions with more detailed information
  const missions = [
    {
      id: 1,
      name: "The Rising Dawn",
      description: "Defeat rogue AI and reclaim lost territories.",
      difficulty: "Medium",
      icon: <Gamepad2 size={48} className="cn-mission-icon" />,
      primaryColor: "#4A90E2",
      secondaryColor: "#1A2980",
    },
    {
      id: 2,
      name: "Operation Thunderbolt",
      description:
        "Infiltrate enemy strongholds and secure critical resources.",
      difficulty: "Hard",
      icon: <Target size={48} className="cn-mission-icon" />,
      primaryColor: "#FF6B6B",
      secondaryColor: "#8E2DE2",
    },
    {
      id: 3,
      name: "Guardian Protocol",
      description: "Protect the ancient AI artifact from intruder intrusions.",
      difficulty: "Easy",
      icon: <ShieldCheck size={48} className="cn-mission-icon" />,
      primaryColor: "#2BDE73",
      secondaryColor: "#4A90E2",
    },
  ];

  // Handle mouse move for parallax background effect
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setBackgroundPosition({ x, y });
    }
  };

  // Start mission handler with more interactive feedback
  const handleStartMission = (mission) => {
    const audio = new Audio("/assets/mission-start.mp3");
    audio.play();

    // Simulating mission start with a loading sequence
    const loadingScreen = document.createElement("div");
    loadingScreen.className = "cn-loading-overlay";
    document.body.appendChild(loadingScreen);

    setTimeout(() => {
      document.body.removeChild(loadingScreen);
      alert(`Launching Mission: ${mission.name}`);
    }, 2000);
  };

  return (
    <motion.div
      ref={containerRef}
      className="cn-campaign-container"
      onMouseMove={handleMouseMove}
      style={{
        "--bg-x": `${backgroundPosition.x}%`,
        "--bg-y": `${backgroundPosition.y}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="cn-background-overlay"></div>

      <motion.div
        className="cn-campaign-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="cn-campaign-title">
          <Sparkles size={32} className="cn-title-sparkle" />
          Campaign Missions
          <Sparkles size={32} className="cn-title-sparkle" />
        </h1>
        <p className="cn-campaign-subtitle">
          Embark on epic adventures to shape the fate of ForgeX
        </p>
      </motion.div>

      <div className="cn-mission-list">
        {missions.map((mission) => (
          <motion.div
            key={mission.id}
            className={`cn-mission-card ${
              selectedMission === mission.id ? "cn-selected" : ""
            }`}
            onClick={() => setSelectedMission(mission.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              "--primary-color": mission.primaryColor,
              "--secondary-color": mission.secondaryColor,
            }}
          >
            {mission.icon}
            <h3 className="cn-mission-name">{mission.name}</h3>
            <p className="cn-mission-description">{mission.description}</p>
            <span className="cn-mission-difficulty">
              Difficulty: {mission.difficulty}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMission && (
          <motion.div
            className="cn-mission-detail"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <h2>
              {missions.find((mission) => mission.id === selectedMission).name}
            </h2>
            <p>
              {
                missions.find((mission) => mission.id === selectedMission)
                  .description
              }
            </p>
            <motion.button
              className="cn-start-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() =>
                handleStartMission(
                  missions.find((mission) => mission.id === selectedMission)
                )
              }
            >
              Start Mission
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Campaign;
