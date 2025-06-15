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
    <section className="relative w-full min-h-[80vh] bg-gradient-to-b from-sandstone-100 to-sandstone-200 dark:from-earth-800 dark:to-earth-900 overflow-hidden">
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 dark:text-sandstone-100 leading-tight"
              >
                Discover African Fashion
                <span className="block text-primary-600 dark:text-primary-400 mt-2">
                  Where Tradition Meets Modern Style
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-charcoal-700 dark:text-sandstone-300 max-w-2xl mx-auto lg:mx-0"
              >
                Experience the vibrant colors, rich textures, and unique designs that celebrate African heritage through contemporary fashion.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-sandstone-100 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Shop Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <button
                  onClick={handleConsultationRedirect}
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-primary-600 text-base font-medium rounded-md text-primary-600 dark:text-primary-400 bg-transparent hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Book Consultation
                </button>
              </motion.div>
            </div>

            {/* Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={heroImages[current].src}
                alt={heroImages[current].label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-400/10 dark:bg-primary-500/10 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary-400/10 dark:bg-secondary-500/10 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>
    </section>
  );
};

export default HeroSection;