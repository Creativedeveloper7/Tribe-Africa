import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/tribe-africa-logo.png'; // Corrected logo path

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-[#8C1C13] flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.img
          src={logo}
          alt="Tribe Africa Logo"
          className="h-24 w-auto mx-auto mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        />
        <motion.h1
          className="text-4xl md:text-5xl font-header font-bold mb-4 text-header-brown hidden" // Hide the text title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Tribe Africa
        </motion.h1>
        <motion.p
          className="text-sandstone-300 text-lg mb-8 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Weaving African Heritage into Modern Fashion
        </motion.p>
        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-earth-700 rounded-full h-3 mb-4 overflow-hidden">
            <motion.div
              className="bg-header-brown h-3 rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <p className="text-sandstone-400 text-sm font-sans">{progress}% Complete</p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;