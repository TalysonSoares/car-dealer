import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-blue-600 text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-4">Follow us on social media:</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-gray-200">
            Facebook
          </a>
          <a href="#" className="hover:text-gray-200">
            Twitter
          </a>
          <a href="#" className="hover:text-gray-200">
            Instagram
          </a>
          <a href="#" className="hover:text-gray-200">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
