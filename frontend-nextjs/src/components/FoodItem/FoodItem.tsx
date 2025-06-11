"use client";

import React, { useContext } from "react";
import Image from "next/image";
import type { StaticImageData } from 'next/image';
import { assets } from "@/assets/assets";
import { StoreContext } from "@/context/StoreContext";
import img1 from '@/assets/food_1.png'
import img2 from '@/assets/food_2.png'

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string | StaticImageData;
}

const FoodItem: React.FC<FoodItemProps> = ({
  id,
  name,
  price,
  description,
  image,
}) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)!;

  return (
    <div className="relative flex flex-col items-center">
      {/* Diamond/Pyramid container */}
      <div className="relative w-64 h-64 mb-2">
        {/* Diamond border */}
        <div className="absolute inset-0 rotate-45 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30 backdrop-blur-sm" />
        
        {/* Inner diamond for image */}
        <div className="absolute inset-4 rotate-45 rounded-lg overflow-hidden bg-slate-800 border border-slate-700">
          <div className="w-full h-full -rotate-45 scale-150 origin-center">
            <Image
              className="w-full h-full object-cover"
              src={img1}
              alt={name}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
          </div>
        </div>
        
        {/* Price tag */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-lg px-4 py-2 shadow-lg border border-gray-200">
          <span className="text-slate-800 font-bold text-lg">Rp. {price}</span>
        </div>
      </div>

      {/* Food info - closer to diamond */}
      <div className="text-center space-y-1 max-w-xs mt-4">
        <h3 className="text-white text-xl md:text-2xl font-bold font-serif">
          {name}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;