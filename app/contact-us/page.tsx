"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";

const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-8 text-center text-lime-600"
      >
        Get in Touch
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl font-semibold mb-6">We'd love to hear from you!</h2>
          <p className="text-xl mb-8">
            Whether you have a question about our service, need help with an order, or want to partner with us, our team is ready to assist you.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <FaEnvelope className="text-2xl text-lime-600 mr-4" />
              <span>support@foodkloud.com</span>
            </div>
            <div className="flex items-center">
              <FaPhone className="text-2xl text-lime-600 mr-4" />
              <span>+91 1800-123-4567</span>
            </div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-2xl text-lime-600 mr-4" />
              <span>123 Food Street, Flavor City, IN 56789</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:w-1/2"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Textarea
              label="Message"
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              color="primary"
              className="w-full bg-lime-600 hover:bg-lime-700"
            >
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>

      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-16 text-center"
      >
        <h2 className="text-3xl font-bold mb-6">Why Choose FoodKloud?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Lightning-Fast Delivery</h3>
            <p>Experience the speed of light with our 10-minute delivery promise.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Curated Local Flavors</h3>
            <p>Discover and enjoy the best local cuisines, handpicked just for you.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Empowering Communities</h3>
            <p>We're not just delivering food; we're nourishing neighborhoods.</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default ContactUsPage;
