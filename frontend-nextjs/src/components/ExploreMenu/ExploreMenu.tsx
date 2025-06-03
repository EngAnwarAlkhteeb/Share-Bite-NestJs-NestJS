"use client"; // Because we use useState in the parent (page.tsx) and it controls this component

import React from "react";
import Image from "next/image"; // For optimized images
import { menu_list } from "../../assets/assets"; // Adjust path as needed
import navLinks from "@/components/Navbar/navLinks"; // Assuming navLinks is in a separate file

// Props interface for TypeScript
interface ExploreMenuProps {
  category: string;
  setCategory: (category: string) => void;
}

// Re-defining getId here or ensuring it's properly exported from the navLinks file
function getId(column: keyof typeof navLinks): string {
  return navLinks[column].replace("#", "");
}

const ExploreMenu: React.FC<ExploreMenuProps> = ({ category, setCategory }) => {
  return (
    <section
      className="bg-white py-16 md:py-24 font-inter"
      id={getId("menu")}
    >
      <div className="container mx-auto px-4">
        
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            Reduce Food Waste, Save Money.
          </h1>
        </div>

        {/* Content Layout - Balanced */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left lg:pl-8">
            
            {/* Mission Section */}
            <div className="mb-8">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <svg className="w-6 h-6 text-yellow-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <h2 className="text-2xl font-semibold text-yellow-600 font-serif">Our Mission</h2>
              </div>
              
              <p className="text-gray-700 text-lg mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                ShareBite connects you with high-quality food at discounted prices from restaurants 
                and stores. Help reduce food waste while enjoying delicious meals at up to 70% off regular prices.
              </p>

              {/* Mission Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto lg:mx-0">
                <div>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Reduce Food Waste.
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Affordable Quality Food.
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Help Environment.
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Up to 70% Discount.
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Fresh Quality Food.
                    </li>
                    <li className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Easy Pickup System.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto lg:mx-0">
              <p className="text-gray-800 italic mb-4 text-lg leading-relaxed">
                "I saved over $200 last month buying discounted food from my favorite restaurants. 
                The quality is amazing and I feel great about helping reduce food waste!"
              </p>
              <div className="flex items-center justify-center lg:justify-start">
                <img
                  src="https://placehold.co/50x50/FACC15/000?text=SC"
                  alt="Sarah Chen Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Sarah Chen</p>
                  <p className="text-sm text-gray-600">Happy Customer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image - Balanced */}
          <div className="order-1 lg:order-2 flex justify-center">
            <img
              src="/img/food_11.png"
              alt="Delicious discounted food"
              className="rounded-lg shadow-lg w-80 h-80 object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/320x320/FACC15/000?text=Food";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreMenu;