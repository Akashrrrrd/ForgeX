import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Training.css";

const Training = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [moduleProgress, setModuleProgress] = useState({});
  const backgroundRef = useRef(null);

  // Training modules with expanded details
  const trainingModules = [
    {
      id: 1,
      title: "Basic Tactics",
      description: "Learn the foundational strategies to succeed in ForgeX.",
      difficulty: "Easy",
      skills: ["Map Awareness", "Resource Management", "Basic Positioning"],
      icon: "🛡️",
      color: "#4CAF50",
    },
    {
      id: 2,
      title: "Advanced Combat",
      description: "Master combat mechanics and advanced weaponry.",
      difficulty: "Medium",
      skills: ["Weapon Mastery", "Combat Techniques", "Strategic Engagement"],
      icon: "⚔️",
      color: "#FF5722",
    },
    {
      id: 3,
      title: "AI Mastery",
      description: "Enhance your AI skills to outsmart your enemies.",
      difficulty: "Hard",
      skills: ["AI Prediction", "Counter-Strategies", "Adaptive Tactics"],
      icon: "🤖",
      color: "#2196F3",
    },
  ];

  // Simulated progress tracking
  const startTraining = (moduleId) => {
    const newProgress = {
      ...moduleProgress,
      [moduleId]: {
        started: true,
        progress: 0,
        completedSkills: [],
      },
    };
    setModuleProgress(newProgress);
  };

  // Parallax background effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (backgroundRef.current) {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / 50;
        const moveY = (clientY - centerY) / 50;

        backgroundRef.current.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="tg-training-container">
      <div ref={backgroundRef} className="tg-parallax-background">
        <div className="tg-background-grid"></div>
        <div className="tg-background-noise"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="tg-training-content"
      >
        <div className="tg-training-header">
          <motion.h1
            className="tg-training-title"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Training Grounds
          </motion.h1>
          <p className="tg-training-subtitle">
            Forge your skills. Dominate the battlefield.
          </p>
        </div>

        <div className="tg-modules-list">
          {trainingModules.map((module) => (
            <motion.div
              key={module.id}
              className={`tg-module-card ${
                selectedModule === module.id ? "tg-selected" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedModule(module.id)}
              style={{
                borderColor: module.color,
                boxShadow:
                  selectedModule === module.id
                    ? `0 0 20px ${module.color}`
                    : "none",
              }}
            >
              <div className="tg-module-icon" style={{ color: module.color }}>
                {module.icon}
              </div>
              <h3 className="tg-module-title">{module.title}</h3>
              <p className="tg-module-description">{module.description}</p>
              <span
                className="tg-module-difficulty"
                style={{ color: module.color }}
              >
                Difficulty: {module.difficulty}
              </span>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedModule && (
            <motion.div
              className="tg-module-detail"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className="tg-module-detail-content">
                <h2>
                  {
                    trainingModules.find(
                      (module) => module.id === selectedModule
                    ).title
                  }
                </h2>
                <div className="tg-module-skills">
                  {trainingModules
                    .find((module) => module.id === selectedModule)
                    .skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        className="tg-skill-tag"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {skill}
                      </motion.div>
                    ))}
                </div>
                <p>
                  {
                    trainingModules.find(
                      (module) => module.id === selectedModule
                    ).description
                  }
                </p>
                <motion.button
                  className="tg-start-training-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startTraining(selectedModule)}
                >
                  Start Training
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Training;
