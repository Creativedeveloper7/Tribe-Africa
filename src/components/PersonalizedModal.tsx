import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Baby, Users } from 'lucide-react';
import { Gender, Occasion } from '../types';
import GalleryButton from './GalleryButton';

interface PersonalizedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectionComplete: (gender: Gender, occasion: Occasion) => void;
}

const PersonalizedModal: React.FC<PersonalizedModalProps> = ({
  isOpen,
  onClose,
  onSelectionComplete
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);
  const [step, setStep] = useState<'gender' | 'occasion'>('gender');

  const genderOptions = [
    { value: 'Male' as Gender, label: 'Male', icon: User },
    { value: 'Female' as Gender, label: 'Female', icon: User },
    { value: 'Kids' as Gender, label: 'Kids', icon: Baby },
  ];

  const occasionOptions: Occasion[] = [
    'Wedding Fit',
    'Work Fit',
    'Safari Fit',
    'Graduation',
    'Birthday',
    'Casual Wear'
  ];

  const handleGenderSelect = (gender: Gender) => {
    setSelectedGender(gender);
    setStep('occasion');
  };

  const handleOccasionSelect = (occasion: Occasion) => {
    if (selectedGender) {
      onSelectionComplete(selectedGender, occasion);
      onClose();
      resetModal();
    }
  };

  const resetModal = () => {
    setSelectedGender(null);
    setStep('gender');
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className="bg-sandstone-100 dark:bg-earth-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-primary-200 dark:border-earth-600"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-earth-900 text-sandstone-100 p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={handleClose}
                  className="text-sandstone-100/80 hover:text-sandstone-100 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
                <GalleryButton />
              </div>

              <h2 className="text-2xl font-header font-bold mb-2 text-sandstone-100">
                {step === 'gender' ? 'What are you shopping for today?' : 'What\'s the occasion?'}
              </h2>
              <p className="text-primary-100 font-sans">
                {step === 'gender'
                  ? 'Help us personalize your experience'
                  : 'Let us show you the perfect pieces'}
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              {step === 'gender' ? (
                <div className="space-y-4">
                  {genderOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <motion.button
                        key={option.value}
                        onClick={() => handleGenderSelect(option.value)}
                        className="w-full p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-charcoal-800 dark:text-sandstone-200 font-sans font-semibold flex flex-col items-center justify-center space-y-2 shadow-lg hover:shadow-xl transition-all duration-200"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <IconComponent className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                        <span className="text-lg">{option.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <motion.button
                    onClick={() => setStep('gender')}
                    className="text-charcoal-600 dark:text-sandstone-400 hover:text-primary-600 dark:hover:text-primary-400 font-sans mb-4 flex items-center"
                    whileHover={{ x: -4 }}
                  >
                    ← Back to gender selection
                  </motion.button>

                  {occasionOptions.map((occasion, index) => (
                    <motion.button
                      key={occasion}
                      onClick={() => handleOccasionSelect(occasion)}
                      className="w-full p-4 text-left rounded-lg border border-primary-200 dark:border-earth-600 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-earth-700 transition-all duration-200 font-sans"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-semibold text-charcoal-800 dark:text-sandstone-200">{occasion}</div>
                      <div className="text-sm text-charcoal-600 dark:text-sandstone-400 mt-1 font-sans">
                        {occasion === 'Wedding Fit' && 'Elegant attire for special ceremonies'}
                        {occasion === 'Work Fit' && 'Professional looks for the workplace'}
                        {occasion === 'Safari Fit' && 'Adventure-ready outdoor wear'}
                        {occasion === 'Graduation' && 'Celebrate achievements in style'}
                        {occasion === 'Birthday' && 'Party-perfect celebration wear'}
                        {occasion === 'Casual Wear' && 'Everyday comfort meets African style'}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PersonalizedModal;