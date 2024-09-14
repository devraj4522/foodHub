"use client";
import React from 'react';
import { FaUtensils, FaMoneyBillWave, FaMotorcycle, FaHandshake, FaApple, FaGooglePlay } from 'react-icons/fa';
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <section className="flex flex-col md:flex-row items-center justify-between mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-4 text-lime-600">Your Local Food Heroes</h1>
          <p className="text-xl mb-6">
            We&apos;re not just another food delivery service. We&apos;re bringing the best flavors of your city right to your doorstep, supporting local restaurants, and creating a thriving food ecosystem.
          </p>
          <div className="flex space-x-4">
            <Button 
              className="bg-lime-600 text-white hover:bg-lime-700"
              size="lg" 
              startContent={<FaApple />}
            >
              Get Started
            </Button>
            <Button 
              className="bg-lime-600 text-white hover:bg-lime-700"
              size="lg" 
              startContent={<FaGooglePlay />}
            >
              Add Restaurant
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            alt="Food Delivery Hero" 
            className="rounded-lg"
            src="https://b.zmtcdn.com/data/pictures/chains/0/21060/18df05cee503aafc336f9a809fad79a3.jpg?output-format=webp" 
          />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-lime-100 to-lime-200">
            <CardHeader className="flex gap-3">
              <FaUtensils className="text-3xl text-lime-600" />
              <div className="flex flex-col">
                <p className="text-xl font-bold">Best Food Selection</p>
                <p className="text-small text-default-500">Quality you can taste</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>We partner with the finest local restaurants to bring you a diverse menu of delicious options.</p>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-lime-100 to-lime-200">
            <CardHeader className="flex gap-3">
              <FaMoneyBillWave className="text-3xl text-lime-600" />
              <div className="flex flex-col">
                <p className="text-xl font-bold">Fair Pricing</p>
                <p className="text-small text-default-500">Affordable for everyone</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>We ensure fair prices for you and fair compensation for restaurants and delivery partners.</p>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-lime-100 to-lime-200">
            <CardHeader className="flex gap-3">
              <FaMotorcycle className="text-3xl text-lime-600" />
              <div className="flex flex-col">
                <p className="text-xl font-bold">Swift Delivery</p>
                <p className="text-small text-default-500">Hot and fresh, always</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>Our efficient delivery network ensures your food arrives quickly and in perfect condition.</p>
            </CardBody>
          </Card>

          <Card className="bg-gradient-to-br from-lime-100 to-lime-200">
            <CardHeader className="flex gap-3">
              <FaHandshake className="text-3xl text-lime-600" />
              <div className="flex flex-col">
                <p className="text-xl font-bold">Community First</p>
                <p className="text-small text-default-500">Supporting local businesses</p>
              </div>
            </CardHeader>
            <CardBody>
              <p>We&apos;re committed to supporting local restaurants and delivery partners, fostering a thriving food ecosystem in our community.</p>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Join the Food Revolution</h2>
        <p className="text-xl mb-6">
          Experience the difference with our customer-centric approach. 
          No hidden fees, no compromises - just great food at great prices.
        </p>
        <Button 
          className="bg-lime-600 text-white hover:bg-lime-700"
          size="lg" 
        >
          Order Now
        </Button>
      </section>

      <section className="bg-lime-100 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-4 text-center">Our Impact</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-lime-600 mb-2">100+</p>
            <p className="text-xl">Local Restaurants Partnered</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-lime-600 mb-2">10,000+</p>
            <p className="text-xl">Happy Customers</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-lime-600 mb-2">500+</p>
            <p className="text-xl">Delivery Partners Empowered</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
