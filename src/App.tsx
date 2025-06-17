import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import BannerManager from './components/BannerManager';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import { CartProvider } from './contexts/CartContext';
import { BANNER_CAMPAIGNS, BANNER_CONFIG } from './constants/banners';

// Pages
import HomePage from './pages/HomePage.tsx';
import ShopPage from './pages/ShopPage.tsx';
import ProductDetailsPage from './pages/ProductDetailsPage.tsx';
import CartPage from './pages/CartPage.tsx';
import CheckoutPage from './pages/CheckoutPage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import AccountPage from './pages/AccountPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

// African-inspired Stitching effect component
const StitchingEffect: React.FC = () => {
  return (
    <motion.svg
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.path
        d="M0,100 Q25,80 50,100 T100,100"
        stroke="#FDB833"
        strokeWidth="2"
        fill="none"
        strokeDasharray="10,5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d="M0,200 Q30,180 60,200 T120,200"
        stroke="#D9381E"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="8,4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      />
      <motion.path
        d="M0,300 Q40,280 80,300 T160,300"
        stroke="#4CAF50"
        strokeWidth="1"
        fill="none"
        strokeDasharray="6,3"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.15 }}
        transition={{ duration: 1.4, delay: 0.9 }}
      />
    </motion.svg>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showStitchingEffect, setShowStitchingEffect] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(BANNER_CONFIG.defaultVisible);

  console.log('App render - isBannerVisible:', isBannerVisible);
  console.log('BANNER_CONFIG:', BANNER_CONFIG);
  console.log('BANNER_CAMPAIGNS:', BANNER_CAMPAIGNS);

  // Scroll effect handler with African-inspired stitching
  useEffect(() => {
    let timeoutId: any;
    
    const handleScroll = () => {
      setShowStitchingEffect(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowStitchingEffect(false);
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <CartProvider>
        <div className="scroll-smooth min-h-screen bg-sandstone-100 dark:bg-charcoal-900 transition-colors duration-300">
          <AnimatePresence>
            {showStitchingEffect && <StitchingEffect />}
          </AnimatePresence>

          <Header onCartOpen={() => setIsCartOpen(true)} />
          
          <AnimatePresence>
            {isBannerVisible && (
              <BannerManager 
                banners={BANNER_CAMPAIGNS}
                autoRotate={BANNER_CONFIG.autoRotate}
                rotationInterval={BANNER_CONFIG.rotationInterval}
                showNavigation={BANNER_CONFIG.showNavigation}
                onClose={() => setIsBannerVisible(false)}
              />
            )}
          </AnimatePresence>
          
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          <Footer />

          <CartSidebar
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;