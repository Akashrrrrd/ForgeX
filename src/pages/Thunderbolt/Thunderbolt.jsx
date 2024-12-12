import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Thunderbolt.css";

const Thunderbolt = () => {
  const [powerLevel, setPowerLevel] = useState(0);

  const handleIncreasePower = () => {
    setPowerLevel((prev) => Math.min(prev + 10, 100));
  };

  const handleResetPower = () => {
    setPowerLevel(0);
  };

  return (
    <div className="td-thunderbolt-container">
      {/* Animated background */}
      <div className="td-background-animation"></div>

      {/* Mission Header */}
      <motion.div
        className="td-mission-header"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Operation Thunderbolt</h1>
        <p>Infiltrate enemy strongholds and secure critical resources.</p>
      </motion.div>

      {/* Power Level Control */}
      <motion.div
        className="td-power-control"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Power Level: {powerLevel}%</h2>
        <div className="td-power-buttons">
          <motion.button
            className="td-button td-increase"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleIncreasePower}
          >
            Increase Power
          </motion.button>
          <motion.button
            className="td-button td-reset"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleResetPower}
          >
            Reset Power
          </motion.button>
        </div>
      </motion.div>

      {/* Status Display */}
      <motion.div
        className="td-status-display"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {powerLevel === 100 ? (
          <motion.div
            className="td-status-ready"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1.2 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.5,
            }}
          >
            Mission Ready! Execute the Operation!
          </motion.div>
        ) : (
          <p>Boost the power to prepare for the mission.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Thunderbolt;
