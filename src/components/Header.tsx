import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/tribe-africa-logo.png';

interface HeaderProps {
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Women', path: '/shop?category=women' },
    { name: 'Men', path: '/shop?category=men' },
    { name: 'Kids', path: '/shop?category=kids' },
    { name: 'Accessories', path: '/shop?category=accessories' },
    { name: 'Events', path: '/events' },
  ];

  return (
    <header className="bg-sandstone-500/95 dark:bg-earth-900/95 backdrop-blur-md shadow-lg sticky top-0 z-40 border-b border-primary-200 dark:border-earth-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img
                src={logo}
                alt="Tribe Africa Logo"
                className="h-10 w-auto object-contain"
                style={{ maxWidth: '120px' }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 font-sans font-medium transition-colors duration-200"
              >
                <motion.span
                  className="block"
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item.name}
                </motion.span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            <motion.button
              className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="h-5 w-5" />
            </motion.button>
            
            <motion.button
              className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="h-5 w-5" />
            </motion.button>

            <motion.button
              className="text-charcoal-800 dark:text-sandstone-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="h-5 w-5" />
            </motion.button>

            <motion.button
              onClick={onCartOpen}
              className="relative text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingBag className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-secondary-500 text-sandstone-100 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {getTotalItems()}
                </motion.span>
              )}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-sandstone-400 dark:bg-earth-800 border-t border-primary-200 dark:border-earth-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.path}
                  className="block px-3 py-2 text-base font-medium text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-earth-700 rounded-md transition-colors duration-200"
                  whileHover={{ x: 4 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-primary-200 dark:border-earth-700">
                <motion.button
                  className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className="h-5 w-5" />
                </motion.button>
                
                <motion.button
                  className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="h-5 w-5" />
                </motion.button>

                <motion.button
                  className="text-charcoal-800 dark:text-sandstone-300 hover:text-secondary-600 dark:hover:text-secondary-400 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart className="h-5 w-5" />
                </motion.button>

                <motion.button
                  onClick={() => {
                    onCartOpen();
                    setIsMenuOpen(false);
                  }}
                  className="relative text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary-500 text-sandstone-100 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {getTotalItems()}
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;