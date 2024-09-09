import React from 'react';
import { FaShieldAlt, FaUserLock, FaCookie, FaEnvelope } from 'react-icons/fa';

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-lime-600">Privacy Policy</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-lime-100">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-3xl text-white">
              <FaShieldAlt />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">Your Privacy Matters</h2>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="mb-6">
            Welcome to our food delivery website. This Privacy Policy outlines how we collect, use, and protect your personal information. As we are in the development stage and this is an MVP (Minimum Viable Product), our practices may evolve, but our commitment to your privacy remains paramount.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-lime-600">Key Points</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaUserLock className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Information Collection</h4>
                <p>We collect only essential information needed to provide our food delivery service, such as your name, contact details, and delivery address.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaCookie className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Cookies and Tracking</h4>
                <p>We use cookies to enhance your browsing experience and analyze website traffic. You can control cookie settings in your browser.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaEnvelope className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Communication</h4>
                <p>We may send you service-related emails. You can opt out of marketing communications at any time.</p>
              </div>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-lime-600">Contact Us</h3>
            <p>
              If you have any questions about our Privacy Policy, please contact us at:
              <br />
              <a href="mailto:privacy@fooddelivery.com" className="text-lime-600 hover:underline">privacy@foodkloud.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
