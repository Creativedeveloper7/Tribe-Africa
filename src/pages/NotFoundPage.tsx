import React from 'react';
// import { Link } from 'react-router-dom'; // removed as Link is no longer exported in v7

const NotFoundPage: React.FC = () => (
  <div className="container mx-auto px-4 py-32 text-center">
    <h1 className="font-header text-5xl font-bold mb-4 text-header-brown">404</h1>
    <p className="font-sans mb-8">Sorry, the page you are looking for does not exist.</p>
    <a href="/" className="text-primary-600 hover:underline">Go back home</a>
  </div>
);

export default NotFoundPage; 