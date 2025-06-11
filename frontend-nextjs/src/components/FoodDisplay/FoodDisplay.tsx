"use client";

import React, { useContext, useState, useRef, useEffect } from "react";
import FoodItem from "@/components/FoodItem/FoodItem";
import { StoreContext } from "@/context/StoreContext";

// Define the shape of a food item for TypeScript
interface FoodItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Define the shape of the StoreContext props
interface StoreContextType {
  food_list: FoodItemType[];
}

interface FoodDisplayProps {
  category: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  const { food_list } = useContext(StoreContext) as StoreContextType;

  const isEmpty = !food_list || food_list.length === 0;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const foodDisplayRef = useRef<HTMLDivElement>(null);

  // Filter food items based on category
  const filteredFoodList = food_list?.filter(item => 
    category === "All" || category === item.category
  ) || [];

  // Auto-slide functionality
  useEffect(() => {
    if (filteredFoodList.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const maxIndex = filteredFoodList.length - 3;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [filteredFoodList.length]);

  // Get current 3 items to display
  const currentItems = filteredFoodList.slice(currentIndex, currentIndex + 3);
  
  // If we don't have enough items, fill from the beginning
  if (currentItems.length < 3 && filteredFoodList.length > 0) {
    const remaining = 3 - currentItems.length;
    currentItems.push(...filteredFoodList.slice(0, remaining));
  }

  const goToPrev = () => {
    setCurrentIndex(prev => {
      const maxIndex = filteredFoodList.length - 3;
      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  const goToNext = () => {
    setCurrentIndex(prev => {
      const maxIndex = filteredFoodList.length - 3;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  return (
    <div 
      ref={foodDisplayRef} 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url('/img/header_img.png')`
      }}
    >


      {/* Decorative gradient overlays */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-600/20 to-orange-600/20 blur-xl" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-gradient-to-br from-green-600/20 to-emerald-600/20 blur-xl" />
      
      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
              <span className="mx-4 text-yellow-500 text-sm font-medium tracking-wider uppercase">
                Our New Item
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Restho New Item List
            </h2>
            
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Various versions have evolved over the years, sometimes on purpose.
            </p>
          </div>

          {/* Food Display Section */}
          {isEmpty ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No food Available</p>
            </div>
          ) : (
            <div className="relative">
              {/* Navigation arrows */}
              {filteredFoodList.length > 3 && (
                <>
                  <button 
                    onClick={goToPrev}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 flex items-center justify-center text-yellow-500 hover:bg-yellow-500/30 transition-all duration-300 -translate-x-6"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    onClick={goToNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 flex items-center justify-center text-yellow-500 hover:bg-yellow-500/30 transition-all duration-300 translate-x-6"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Food Cards Container */}
              <div className="px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentItems.map((item, index) => (
                    <div 
                      key={`${item._id}-${currentIndex}-${index}`}
                      className="transform transition-all duration-500 hover:scale-105"
                      style={{
                        animation: `slideInFromRight 1s ease-out ${index * 0.2}s both`
                      }}
                    >
                      <FoodItem
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default FoodDisplay;