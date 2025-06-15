import React from 'react';
const NewsletterSignup: React.FC = () => (
  <div className="bg-white dark:bg-charcoal-900 p-6 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-2">Newsletter Signup</h2>
    <p className="mb-4">Subscribe to our newsletter for updates!</p>
    <form>
      <input type="email" placeholder="Your email" className="border p-2 rounded mr-2" />
      <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">Subscribe</button>
    </form>
  </div>
);
export default NewsletterSignup; 