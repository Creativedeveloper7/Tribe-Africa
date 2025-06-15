import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-earth-100 dark:bg-earth-800 text-charcoal-900 dark:text-sandstone-500 hover:bg-earth-200 dark:hover:bg-earth-700 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        className="relative w-5 h-5"
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Sun className="w-5 h-5 text-primary-600" />
        ) : (
          <Moon className="w-5 h-5 text-primary-400" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;