"use client"; // This component uses client-side interactivity like hover effects

import React from "react";
import Image from "next/image"; // For image optimization
import { assets } from "../../assets/assets"; // Assuming assets are now in a dedicated 'assets' folder

interface AppDownloadProps {
  // No props needed for this simple component
}

const AppDownload: React.FC<AppDownloadProps> = () => {
  return (
    <section className="bg-white py-16 font-inter">
      <div className="container mx-auto px-4">
        
        {/* Content Container */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            For Better Experience
          </h2>
          
          <h3 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
            <span className="text-yellow-600">Download</span>{" "}
            <span className="text-yellow-600">
              ShareBite
            </span>
          </h3>

          {/* Description */}
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Get access to exclusive discounts, faster checkout, and real-time notifications 
            about new food deals near you.
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <Image
              src={assets.play_store}
              alt="Download on Google Play Store"
              width={160} 
              height={48} 
              className="w-40 h-12 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg rounded-lg"
            />
            <Image
              src={assets.app_store}
              alt="Download on Apple App Store"
              width={160} 
              height={48} 
              className="w-40 h-12 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg rounded-lg"
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.07 13H11a4 4 0 001.31-.22A3 3 0 0014 10h2.5A2.5 2.5 0 0019 7.5V7a6 6 0 00-6-6H7a6 6 0 00-6 6v6a6 6 0 006 6h4.15" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Fast Notifications</h4>
              <p className="text-gray-600 text-sm text-center">Get instant alerts for new deals</p>
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Location Based</h4>
              <p className="text-gray-600 text-sm text-center">Find deals near your location</p>
            </div>

            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Easy Payment</h4>
              <p className="text-gray-600 text-sm text-center">Secure and quick checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;