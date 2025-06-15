import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import EventsCarousel from '../components/EventsCarousel';
import ProductGrid from '../components/ProductGrid';
import NewsletterSignup from '../components/NewsletterSignup';
import TestimonialsSection from '../components/TestimonialsSection';
import CategoryShowcase from '../components/CategoryShowcase';
import PersonalizedModal from '../components/PersonalizedModal';
import { Gender, Occasion } from '../types';

const HomePage: React.FC = () => {
  const [showPersonalizedModal, setShowPersonalizedModal] = React.useState(false);
  const [selectedGender, setSelectedGender] = React.useState<Gender | undefined>();
  const [selectedOccasion, setSelectedOccasion] = React.useState<Occasion | undefined>();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowPersonalizedModal(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handlePersonalizationComplete = (gender: Gender, occasion: Occasion) => {
    setSelectedGender(gender);
    setSelectedOccasion(occasion);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section>
        <HeroSection />
      </section>

      {/* Events Carousel */}
      <section className="container mx-auto px-4">
        <EventsCarousel />
      </section>

      {/* Featured Categories */}
      <section className="container mx-auto px-4">
        <h2 className="font-header text-3xl font-bold text-center mb-8 text-sandstone-200 dark:text-white">
          Explore Our Collections
        </h2>
        <CategoryShowcase />
      </section>

      {/* Personalized Product Grid */}
      <section className="container mx-auto px-4">
        <ProductGrid 
          selectedGender={selectedGender}
          selectedOccasion={selectedOccasion}
        />
      </section>

      {/* Testimonials */}
      <section className="bg-sandstone-50 dark:bg-orange-800 py-16">
        <div className="container mx-auto px-4">
          <TestimonialsSection />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4">
        <NewsletterSignup />
      </section>

      {/* Personalized Modal */}
      <PersonalizedModal
        isOpen={showPersonalizedModal}
        onClose={() => setShowPersonalizedModal(false)}
        onSelectionComplete={handlePersonalizationComplete}
      />
    </div>
  );
};

export default HomePage; 