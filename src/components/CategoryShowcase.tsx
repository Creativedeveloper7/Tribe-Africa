import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'women',
    name: 'Women',
    description: 'Elegant and contemporary designs for the modern woman',
    image: '/images/categories/women.jpg',
    link: '/shop?category=women'
  },
  {
    id: 'men',
    name: 'Men',
    description: 'Sophisticated styles that blend tradition with modern fashion',
    image: '/images/categories/men.jpg',
    link: '/shop?category=men'
  },
  {
    id: 'kids',
    name: 'Kids',
    description: 'Playful and comfortable designs for the little ones',
    image: '/images/categories/kids.jpg',
    link: '/shop?category=kids'
  },
  {
    id: 'accessories',
    name: 'Accessories',
    description: 'Unique pieces to complement your African fashion',
    image: '/images/categories/accessories.jpg',
    link: '/shop?category=accessories'
  }
];

const CategoryShowcase: React.FC = () => {
  return (
    <section className="w-full bg-sandstone-50 dark:bg-earth-900 py-12 sm:py-16 lg:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900 dark:text-sandstone-100 mb-4"
            >
              Explore Our Collection
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-charcoal-700 dark:text-sandstone-300 max-w-2xl mx-auto"
            >
              Discover our carefully curated categories, each offering unique pieces that celebrate African heritage
            </motion.p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-earth-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <Link to={category.link} className="block">
                  {/* Category Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  </div>

                  {/* Category Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-bold text-sandstone-100 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sandstone-200 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors duration-200">
                      <span className="text-sm font-medium">Shop Now</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase; 