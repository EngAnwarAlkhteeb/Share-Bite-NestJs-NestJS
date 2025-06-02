"use client";

import React, { useState } from "react";
import img1 from "../../../src/assets/front/union-left.svg";
import { FaArrowLeft } from "react-icons/fa";

const Header = () => {
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <div className="bg-gray-900 text-white font-inter w-full">
      {/* Hero Section */}
      <section className="relative w-screen h-[600px] flex items-center justify-center overflow-hidden">
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <p className="text-[#f35324] text-[25px] mb-5 font-serif">
            Welcome To ShareBite
          </p>
          <h1 className="text-6xl md:text-6xl font-bold leading-tight mb-6 font-serif">
            Make Every Meal Count <br /> 48 million tons of food <br /> wasted
            every year.
          </h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mb-8">
            waste no more! Fight food waste together with{" "}
          </p>
          <button className="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-600 transition-colors duration-300 shadow-xl">
            Discover More
          </button>
          <footer className="mt-[35px]">
            <div className="flex justify-center space-x-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" />
              </a>
              <a
                href="https://messenger.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="https://img.icons8.com/fluent/30/000000/twitter.png" />
              </a>
            </div>
          </footer>
        </div>

        {/* Side Images with Navigation */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center z-20">
          <FaArrowLeft className=" " />
          
          <div className="rounded-full shadow-lg">
            {/* <img
              src={img1}
              alt="Food Dish 1"
              className="w-48 h-48 md:w-64 md:h-64 object-cover shadow-lg -ml-16 md:-ml-24"
            /> */}
          </div>
        </div>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center z-20">
          <img
            src="https://placehold.co/300x300/FACC15/000?text=Food+Image+2"
            alt="Food Dish 2"
            className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-full shadow-lg border-4 border-[#f35324] -mr-16 md:-mr-24"
            // onError={(e) => {
            //   e.target.onerror = null;
            //   e.target.src =
            //     "https://placehold.co/300x300/FACC15/000?text=Image+Error";
            // }}
          />
          <button className="bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-full mr-4 focus:outline-none transition-all duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </button>
        </div>
      </section>

      {/* Social Media Footer */}
    </div>
  );
};

export default Header;
