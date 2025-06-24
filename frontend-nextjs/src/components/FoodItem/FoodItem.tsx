"use client";

import React, { useContext } from "react";
import Image from "next/image";
import type { StaticImageData } from 'next/image';
import { assets } from "@/assets/assets";
import { StoreContext } from "@/context/StoreContext";
import img1 from '@/assets/food_1.png'
import img2 from '../../assets/add-3d-icon.png'
import img3 from '../../assets/remove-3d-icon.png'
import img4 from '../../assets/add_icon_green.png'

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
    <div className="w-full m-auto rounded-2xl shadow-[0px_8px_32px_rgba(0,0,0,0.12)] transition-all duration-500 animate-fadeIn h-full hover:shadow-[0px_16px_48px_rgba(139,69,255,0.15)] hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border border-gray-100 group overflow-hidden">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Image
          className="h-[180px] object-cover w-full transition-transform duration-500 group-hover:scale-110"
          src={typeof image === 'string' ? image : img1}
          alt={name}
          width={300}
          height={180}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {!cartItems[id] ? (
          <div className="absolute bottom-4 right-4 transform hover:scale-110 transition-all duration-200 cursor-pointer">
            <div className="p-2 hover:shadow-xl">
              <Image
                onClick={() => addToCart(id)}
                src={img4}
                alt="Add to cart"
                width={24}
                height={24}
                className="filter drop-shadow-sm"
              />
            </div>
          </div>
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center p-2 gap-3 rounded-full bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200">
            <div className="transform hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Image
                onClick={() => removeFromCart(id)}
                src={img3}
                alt="Remove from cart"
                width={20}
                height={20}
                className="filter drop-shadow-sm"
              />
            </div>
            <span className="text-gray-800 font-semibold min-w-[20px] text-center">
              {cartItems[id]}
            </span>
            <div className="transform hover:scale-110 transition-transform duration-200 cursor-pointer">
              <Image
                onClick={() => addToCart(id)}
                src={img2}
                alt="Add more"
                width={20}
                height={20}
                className="filter drop-shadow-sm"
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-400 px-2 py-1 rounded-full">
            <span className="text-white text-xs font-bold">★</span>
            <span className="text-white text-xs font-semibold">4.5</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${price}
            </span>
            <span className="text-xs text-gray-500">per item</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-600 font-medium">Available</span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute top-6 left-6 w-4 h-4 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
    </div>
  );
};

export default FoodItem;

