import React from 'react';
import { FaBalanceScale, FaShieldAlt, FaTruck, FaUserCircle } from 'react-icons/fa';

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-lime-600">Terms and Conditions</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6 bg-lime-100">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center text-3xl text-white">
              <FaBalanceScale />
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">Our Agreement</h2>
              <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="mb-6">
            Welcome to FoodKloud. These Terms and Conditions govern your use of our food delivery service in India. As we are currently in the MVP (Minimum Viable Product) stage, these terms may evolve, but our commitment to providing a fair and transparent service remains constant.
          </p>

          <h3 className="text-xl font-semibold mb-4 text-lime-600">Key Points</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <FaUserCircle className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">User Accounts</h4>
                <p>You must be at least 18 years old to use our service. You are responsible for maintaining the confidentiality of your account and password.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaTruck className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Order and Delivery</h4>
                <p>We strive to ensure timely delivery, but delivery times may vary based on factors beyond our control. You agree to provide accurate delivery information within our service areas in India.</p>
              </div>
            </li>
            <li className="flex items-start">
              <FaShieldAlt className="text-lime-600 mt-1 mr-3" />
              <div>
                <h4 className="font-semibold">Liability</h4>
                <p>While we take all reasonable precautions, we are not liable for any issues arising from the quality of food prepared by partner restaurants. Our liability is limited as per Indian law.</p>
              </div>
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-lime-600">Modifications to the Service</h3>
            <p className="mb-4">
              We reserve the right to modify or discontinue, temporarily or permanently, the service (or any part thereof) with or without notice. You agree that FoodKloud shall not be liable to you or to any third party for any modification, suspension or discontinuance of the service.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-lime-600">Governing Law</h3>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts in India.
            </p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-lime-600">Contact Us</h3>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              <a href="mailto:terms@foodkloud.com" className="text-lime-600 hover:underline">terms@foodkloud.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
