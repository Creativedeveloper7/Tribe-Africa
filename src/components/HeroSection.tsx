import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, MessageCircle } from 'lucide-react';
import modernSanaa from '../assets/my-images/modern Sanaa.jpeg';
import maleImg from '../assets/my-images/male.png';
import girlImg from '../assets/my-images/girl.png';
import kidsImg from '../assets/my-images/kids.png';
import { Link } from 'react-router-dom';
import { generateConsultationLink } from '../utils/whatsapp';

const heroImages = [
  { src: maleImg, label: 'Male' },
  { src: girlImg, label: 'Female' },
  { src: kidsImg, label: 'Kids' },
];

const HeroSection: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleConsultationRedirect = () => {
    const message = "I'd like to book a consultation for my fashion needs. I'm interested in discussing custom designs and getting personalized recommendations.";
    window.open(generateConsultationLink(message), '_blank');
  };

  return (
    <section className="relative min-h-screen bg-[#8C1C13] overflow-hidden">
      
      {/* African Pattern Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="w-full h-full bg-kente-pattern"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary-500 fill-current" />
                ))}
              </div>
              <span className="ml-2 text-charcoal-700 dark:text-sandstone-300 font-sans">Trusted by 500+ customers</span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-header text-4xl md:text-6xl lg:text-7xl font-bold text-header-brown mb-6 leading-tight">
              African
              <span className="block text-header-brown">
                Fashion
              </span>
              for Modern Life
            </h1>

            <p className="font-sans text-lg md:text-xl text-charcoal-600 dark:text-sandstone-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover authentic African designs reimagined for contemporary living. 
              From traditional ceremonies to modern workplaces, we craft pieces that 
              celebrate heritage while embracing the future.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop" className="w-full sm:w-auto">
                <motion.button
                  className="w-full font-sans bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-sandstone-100 px-8 py-4 rounded-lg font-semibold flex items-center justify-center group shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.button
                onClick={handleConsultationRedirect}
                className="w-full sm:w-auto font-sans border-2 border-charcoal-800 dark:border-sandstone-300 text-charcoal-800 dark:text-sandstone-300 px-8 py-4 rounded-lg font-semibold hover:bg-charcoal-800 hover:text-sandstone-100 dark:hover:bg-sandstone-300 dark:hover:text-charcoal-800 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Book Consultation</span>
              </motion.button>
            </div>

            {/* Stats with African Theme */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-200 dark:border-earth-700">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-primary-600">500+</div>
                <div className="text-charcoal-600 dark:text-sandstone-400 font-body">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-secondary-600">50+</div>
                <div className="text-charcoal-600 dark:text-sandstone-400 font-body">Unique Designs</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-display font-bold text-savanna-600">5★</div>
                <div className="text-charcoal-600 dark:text-sandstone-400 font-body">Average Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Carousel Image Showcase */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              {/* Carousel Image */}
              <motion.div
                key={current}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-200 dark:border-earth-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={heroImages[current].src}
                  alt={heroImages[current].label}
                  className="w-full h-[600px] object-cover"
                />
                {/* Label Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#8C1C13]/80 text-header-brown px-6 py-2 rounded-full text-xl font-header font-bold shadow-lg">
                  {heroImages[current].label}
                </div>
              </motion.div>
              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-4">
                {heroImages.map((img, idx) => (
                  <button
                    key={img.label}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      idx === current ? 'bg-header-brown scale-125' : 'bg-charcoal-300 dark:bg-sandstone-400 hover:bg-charcoal-400 dark:hover:bg-sandstone-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-charcoal-400 dark:border-sandstone-400 rounded-full flex justify-center"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-primary-500 rounded-full mt-2"
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;