"use client";

import React, { useEffect, useRef, useState } from "react";
import FoodItem from "@/components/FoodItem/FoodItem";

interface FoodItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface FoodDisplayProps {
  category: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  const [foodList, setFoodList] = useState<FoodItemType[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const foodDisplayRef = useRef<HTMLDivElement>(null);

  // Fetch data from API
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:8000/foods");
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setFoodList(data);
      } catch (err: any) {
        console.error("Failed to fetch food data:", err);
        setError("Failed to load food data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const showingFoodList = showAll ? foodList : foodList.slice(0, 4);

  const handleShowToggle = () => {
    setShowAll((prev) => !prev);
    if (showAll) {
      setTimeout(() => {
        foodDisplayRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div ref={foodDisplayRef} className="bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-white mb-2">
            Top Dishes Near You
          </h2>
        </div>

        {/* Content */}
        {isLoading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : foodList.length === 0 ? (
          <p className="text-center text-gray-400">No food available.</p>
        ) : (
          <>
            {/* Food Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {showingFoodList
                .filter(
                  (item) => category === "All" || item.category === category
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="transform transition-transform duration-200 hover:scale-102"
                  >
                    <FoodItem
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      image={item.image}
                    />
                  </div>
                ))}
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
