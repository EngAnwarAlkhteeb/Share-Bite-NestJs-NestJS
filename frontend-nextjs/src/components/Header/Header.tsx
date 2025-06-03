"use client";

import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Header = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array gambar food dari folder public/img
  const foodImages = [
    { left: "/img/food_1.png", right: "/img/food_2.png" },
    { left: "/img/food_3.png", right: "/img/food_4.png" },
    { left: "/img/food_5.png", right: "/img/food_6.png" },
    { left: "/img/food_7.png", right: "/img/food_8.png" },
    { left: "/img/food_9.png", right: "/img/food_10.png" },
    { left: "/img/food_11.png", right: "/img/food_12.png" },
    { left: "/img/food_13.png", right: "/img/food_14.png" },
    { left: "/img/food_15.png", right: "/img/food_16.png" }
  ];

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? foodImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === foodImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-gray-900 text-white font-inter w-full">
      {/* Custom CSS untuk rotasi terus menerus */}
      <style jsx>{`
        .continuous-rotate {
          animation: continuousRotation 8s linear infinite;
        }
        
        @keyframes continuousRotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-orange-500 rounded-full"></div>
          <div className="absolute top-40 right-40 w-24 h-24 border border-orange-500 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-orange-500 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 border border-orange-500 rounded-full"></div>
        </div>

        {/* Left Food Image with Navigation */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex items-center z-20">
          <button 
            onClick={handlePrevious}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-3 rounded-full mr-4 focus:outline-none transition-all duration-300 shadow-lg"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative">
            <img
              key={`left-${currentImageIndex}`}
              src={foodImages[currentImageIndex].left}
              alt={`Food Dish Left ${currentImageIndex + 1}`}
              className="w-56 h-56 object-cover rounded-full shadow-xl border-4 border-white transition-all duration-500 continuous-rotate"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/300x300/8B4513/FFF?text=Food+Left";
              }}
            />
          </div>
        </div>

        {/* Right Food Image with Navigation */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex items-center z-20">
          <div className="relative">
            <img
              key={`right-${currentImageIndex}`}
              src={foodImages[currentImageIndex].right}
              alt={`Food Dish Right ${currentImageIndex + 1}`}
              className="w-56 h-56 object-cover rounded-full shadow-xl border-4 border-white transition-all duration-500 continuous-rotate"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/300x300/228B22/FFF?text=Food+Right";
              }}
            />
          </div>
          <button 
            onClick={handleNext}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 p-3 rounded-full ml-4 focus:outline-none transition-all duration-300 shadow-lg"
          >
            <FaArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl">
          {/* Logo/Icon placeholder */}
          <div className="mb-6">
            <p className="text-yellow-500 text-lg font-medium tracking-wider">
              ◊ Welcome To ShareBite ◊
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-serif">
            Find Your Best Healthy
            <br />
            & Tasty Food.
          </h1>
          <button className="bg-transparent border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-xl flex items-center space-x-2">
            <span>Discover More</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Header;