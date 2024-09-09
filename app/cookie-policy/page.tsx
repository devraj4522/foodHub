import React from 'react';
import { FaCookie, FaShieldAlt, FaMobileAlt, FaGlobe } from 'react-icons/fa';

const CookiePolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-lime-600">Cookie Policy</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-lime-100">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-3xl text-white">
              <FaCookie />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">Our Cookie Policy</h2>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="mb-6">
            Welcome to FoodKloud, your trusted Indian food delivery service. This Cookie Policy explains how we use cookies and similar technologies on our website and mobile app to enhance your experience and improve our services.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-lime-600">What are Cookies?</h3>
          <p className="mb-6">
            Cookies are small text files that are placed on your device when you visit our website or use our app. They help us remember your preferences and provide a more personalized experience.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-lime-600">How We Use Cookies</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaShieldAlt className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Essential Cookies</h4>
                <p>These cookies are necessary for the website and app to function properly. They enable basic features like page navigation and access to secure areas.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaMobileAlt className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Functionality Cookies</h4>
                <p>These cookies allow us to remember your preferences and customize your experience. For example, they help us remember your favorite Indian dishes and delivery locations.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaGlobe className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Analytics Cookies</h4>
                <p>We use these cookies to understand how visitors interact with our website and app. This helps us improve our services and offer better Indian cuisine options.</p>
              </div>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-lime-600">Managing Cookies</h3>
            <p className="mb-4">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed. However, if you do this, you may have to manually adjust some preferences every time you visit our website or use our app, and some services and functionalities may not work.
            </p>
            <p>
              For more information about cookies and how to manage them on different devices, visit <a href="https://www.allaboutcookies.org/" className="text-lime-600 hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-lime-600">Contact Us</h3>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
              <br />
              <a href="mailto:privacy@foodkloud.com" className="text-lime-600 hover:underline">privacy@foodkloud.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
