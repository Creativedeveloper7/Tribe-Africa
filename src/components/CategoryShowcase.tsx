import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  { name: "Women's Collection", path: '/shop?category=women' },
  { name: "Men's Collection", path: '/shop?category=men' },
  { name: "Kids Fashion", path: '/shop?category=kids' },
  { name: "Wedding Collection", path: '/shop?category=wedding' },
  { name: "Accessories", path: '/shop?category=accessories' },
  { name: "Custom Orders", path: '/shop?category=custom' }
];

const CategoryShowcase: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {categories.map((category) => (
      <Link 
        key={category.name}
        to={category.path}
        className="block bg-sandstone-50 dark:bg-charcoal-900 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
      >
        <h3 className="text-xl font-bold text-charcoal-900 dark:text-sandstone-200 mb-2">
          {category.name}
        </h3>
        <p className="text-charcoal-600 dark:text-sandstone-400">
          Explore Collection →
        </p>
      </Link>
    ))}
  </div>
);

export default CategoryShowcase; 