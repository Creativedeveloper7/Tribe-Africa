import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants/contact';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: CONTACT_INFO.social.facebook, label: 'Facebook' },
    { icon: Instagram, href: CONTACT_INFO.social.instagram, label: 'Instagram' },
    { icon: Twitter, href: CONTACT_INFO.social.twitter, label: 'Twitter' },
    { icon: MessageCircle, href: `https://wa.me/${CONTACT_INFO.whatsapp.number}`, label: 'WhatsApp' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Story', href: '#story' },
    { name: 'Size Guide', href: '#size-guide' },
    { name: 'Care Instructions', href: '#care' },
    { name: 'Shipping Info', href: '#shipping' },
    { name: 'Returns', href: '#returns' },
  ];

  const categories = [
    { name: 'Women\'s Collection', href: '#women' },
    { name: 'Men\'s Collection', href: '#men' },
    { name: 'Kids Fashion', href: '#kids' },
    { name: 'Accessories', href: '#accessories' },
    { name: 'Wedding Collection', href: '#wedding' },
    { name: 'Custom Orders', href: '#custom' },
  ];

  return (
    <footer className="bg-[#8C1C13] text-sandstone-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-header text-3xl font-bold mb-4 text-header-brown">
              Tribe Africa
            </h2>
            <p className="text-sandstone-300 font-body leading-relaxed mb-6">
              Celebrating African heritage through contemporary fashion. 
              We craft authentic pieces that honor tradition while embracing modernity.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sandstone-300 font-body">{CONTACT_INFO.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sandstone-300 font-body">{CONTACT_INFO.whatsapp.formattedNumber}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                <span className="text-sandstone-300 font-body">{CONTACT_INFO.email}</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-display font-semibold text-sandstone-100 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    className="text-sandstone-300 hover:text-primary-400 font-body transition-colors duration-200"
                    whileHover={{ x: 4 }}
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-display font-semibold text-sandstone-100 mb-6">
              Collections
            </h3>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.name}>
                  <motion.a
                    href={category.href}
                    className="text-sandstone-300 hover:text-primary-400 font-body transition-colors duration-200"
                    whileHover={{ x: 4 }}
                  >
                    {category.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-display font-semibold text-sandstone-100 mb-6">
              Stay Connected
            </h3>
            <p className="text-sandstone-300 font-body mb-4">
              Subscribe to get updates on new collections and exclusive offers.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-earth-800 border border-earth-700 rounded-l-lg px-4 py-3 text-sandstone-200 placeholder-sandstone-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-body"
                />
                <motion.button
                  className="bg-primary-600 hover:bg-primary-700 text-sandstone-100 px-6 py-3 rounded-r-lg font-body font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-earth-800 hover:bg-primary-600 text-sandstone-300 hover:text-sandstone-100 p-3 rounded-lg transition-all duration-200 border border-earth-700 hover:border-primary-500"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <IconComponent className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-earth-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sandstone-400 font-body text-sm mb-4 md:mb-0">
              © {currentYear} Tribe Africa. All rights reserved. Made with ❤️ in Kenya.
            </p>
            
            <div className="flex items-center space-x-6">
              <motion.a
                href="#privacy"
                className="text-sandstone-400 hover:text-primary-400 font-body text-sm transition-colors"
                whileHover={{ y: -1 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#terms"
                className="text-sandstone-400 hover:text-primary-400 font-body text-sm transition-colors"
                whileHover={{ y: -1 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#cookies"
                className="text-sandstone-400 hover:text-primary-400 font-body text-sm transition-colors"
                whileHover={{ y: -1 }}
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;