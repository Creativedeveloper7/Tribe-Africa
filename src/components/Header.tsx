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
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 sm:w-32"
            >
              <img
                src={logo}
                alt="Tribe Africa Logo"
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 font-sans font-medium transition-colors duration-200 whitespace-nowrap"
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
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <ThemeToggle />
            
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

            {/* Cart - Link to full cart page */}
            <Link to="/cart">
              <motion.button
                className="relative text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-sandstone-100 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Quick Cart Sidebar Button */}
            <motion.button
              onClick={onCartOpen}
              className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors border-l border-gray-300 dark:border-earth-600 pl-4"
              whileTap={{ scale: 0.95 }}
              title="Quick Cart View"
            >
              <span className="text-sm font-medium">Quick View</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Mobile Cart - Link to full cart page */}
            <Link to="/cart">
              <motion.button
                className="relative text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary-600 text-sandstone-100 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>
            </Link>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-sandstone-100 dark:bg-earth-900 border-t border-primary-200 dark:border-earth-700"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 text-base font-medium text-charcoal-800 dark:text-sandstone-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-100 dark:hover:bg-earth-700 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <motion.span
                    className="block"
                    whileHover={{ x: 4 }}
                  >
                    {item.name}
                  </motion.span>
                </Link>
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;