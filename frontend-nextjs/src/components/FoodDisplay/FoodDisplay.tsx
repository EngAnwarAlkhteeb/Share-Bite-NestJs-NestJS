"use client"; // This component uses useContext and useState, so it must be a client component

import React, { useContext, useState, useRef } from "react";
import FoodItem from "@/components/FoodItem/FoodItem"; // Adjust the path as needed
import { StoreContext } from "@/context/StoreContext";

// Define the shape of a food item for TypeScript
interface FoodItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // Assuming category is part of the food item
}

// Define the shape of the StoreContext props
interface StoreContextType {
  food_list: FoodItemType[]; // Assuming food_list is an array of FoodItemType
  // Add other context properties if needed, e.g., cart, token
}

interface FoodDisplayProps {
  category: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  // Use a default value for context to satisfy TypeScript, or handle it as undefined
  const { food_list } = useContext(StoreContext) as StoreContextType; // Explicitly cast the context

  const isEmpty = !food_list || food_list.length === 0;

  const [showAll, setShowAll] = useState<boolean>(false); // Type useState for boolean
  
  // Reference to the food display section for scrolling
  const foodDisplayRef = useRef<HTMLDivElement>(null);

  const showing_food_list = showAll ? food_list : food_list.slice(0, 4); // Show only 4 items initially

  const handleShowToggle = () => {
    if (showAll) {
      // If currently showing all, scroll back to food display section
      setShowAll(false);
      setTimeout(() => {
        foodDisplayRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } else {
      // If currently showing limited, just show all
      setShowAll(true);
    }
  };

  return (
    <div ref={foodDisplayRef} className="bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white mb-2">
            Top Dishes Near You
          </h2>
        </div>

        {/* Food Grid Section */}
        {isEmpty ? (
          <p className="text-center text-gray-400">No food Available</p>
        ) : (
          <>
            {/* Food Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {showing_food_list.map((item, index) => {
                // Only render if the category matches or is "All"
                if (category === "All" || category === item.category) {
                  return (
                    <div 
                      key={item._id}
                      className="transform transition-transform duration-200 hover:scale-102"
                    >
                      <FoodItem
                        id={item._id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                      />
                    </div>
                  );
                }
                return null; // Don't render if category doesn't match
              })}
            </div>

            {/* Show More/Less Button */}
            <div className="text-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded transition-colors duration-200"
                type="button"
                onClick={handleShowToggle}
              >
                {showAll ? "Show less" : "Show more"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;