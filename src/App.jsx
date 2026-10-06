import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence
} from "framer-motion";

import "./App.css";

function App() {
  const [count, setCount] = useState(10);
  const [isRunning, setIsRunning] = useState(true);
  const [completed, setCompleted] = useState(false);

  // COUNTDOWN LOGIC
  useEffect(() => {
    if (!isRunning || completed) return;

    if (count === 0) {
      setCompleted(true);
      setIsRunning(false);
      return;
    }

    const timer = setTimeout(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, isRunning, completed]);

  // PAUSE / RESUME
  const handlePause = () => {
    setIsRunning((prev) => !prev);
  };

  // RESET
  const handleReset = () => {
    setCount(10);
    setCompleted(false);
    setIsRunning(true);
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15
      }
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(15px)",
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="main-container">

      <AnimatePresence mode="wait">

        {!completed ? (

          <motion.div
            key="loader"
            className="loader-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >

            {/* HEADER */}

            <motion.h1
              className="heading"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              LOADER COUNTDOWN
            </motion.h1>

            <motion.p
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              NEURAL TIME SUBSYSTEM
            </motion.p>

            {/* LOADER BOX */}

            <motion.div
              className="loader-box"
              variants={containerVariants}
            >

              {/* CIRCULAR ANIMATION */}

              <div className="circle-wrapper">

                <motion.div
                  className="outer-circle"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.div
                  className="middle-circle"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.div
                  className="inner-circle"
                  animate={{
                    scale: [1, 1.08, 1],
                    boxShadow: [
                      "0 0 10px #00d9ff",
                      "0 0 30px #00d9ff",
                      "0 0 10px #00d9ff"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />

                {/* NUMBER ANIMATION */}

                <AnimatePresence mode="wait">

                  <motion.span
                    key={count}
                    className="count-number"
                    initial={{
                      opacity: 0,
                      scale: 0.3,
                      rotateX: 90
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotateX: 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.8,
                      filter: "blur(10px)"
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {count}
                  </motion.span>

                </AnimatePresence>

                <motion.div
                  className="orbit-dot"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

              </div>

              {/* STATUS */}

              <motion.p
                className="status-text"
                key={isRunning ? "active" : "paused"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {isRunning
                  ? "SYSTEM INITIALIZING..."
                  : "SYSTEM PAUSED"}
              </motion.p>

              {/* BUTTONS */}

              <div className="buttons">

                <motion.button
                  className="pause-btn"
                  onClick={handlePause}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 20px #00d9ff"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isRunning ? "Ⅱ PAUSE" : "▶ RESUME"}
                </motion.button>

                <motion.button
                  className="reset-btn"
                  onClick={handleReset}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 20px #b44cff"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  ↻ RESET
                </motion.button>

              </div>

            </motion.div>

          </motion.div>

        ) : (

          /* COMING SOON SCREEN */

          <motion.div
            key="coming"
            className="coming-card"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            <motion.h1
              className="coming-title"
              initial={{
                opacity: 0,
                y: 50,
                letterSpacing: "2px"
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "9px"
              }}
              transition={{
                duration: 1,
                ease: "easeOut"
              }}
            >
              COMING
              <br />
              SOON
            </motion.h1>

            <motion.p
              className="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              System synchronization complete.
              <br />
              The next phase is initializing.
            </motion.p>

            <motion.button
              className="initialize-btn"
              onClick={handleReset}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 25px #b44cff"
              }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              ↻ RE-INITIALIZE SYSTEM
            </motion.button>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

export default App;