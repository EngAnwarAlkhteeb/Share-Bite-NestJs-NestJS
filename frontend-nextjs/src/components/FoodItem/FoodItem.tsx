"use client";

import React, { useContext } from "react";
import Image from "next/image";
import type { StaticImageData } from 'next/image'; // Import StaticImageData type
import { assets } from "@/assets/assets";
import { StoreContext } from "@/context/StoreContext";
import img1 from '@/assets/food_1.png'
import img2 from '@/assets/food_2.png'

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  description: string;
  // --- CHANGE 1: Update image prop type ---
  image: string | StaticImageData; // 
  // --- END CHANGE 1 ---
}

const FoodItem: React.FC<FoodItemProps> = ({
  id,
  name,
  price,
  description,
  image,
}) => {
  // --- CHANGE 2: Remove 'url' from useContext destructuring as it's no longer needed for local images ---
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)!;
  // --- END CHANGE 2 ---

  return (
    <div className="w-full m-auto rounded-xl shadow-[0px_0px_15px_rgba(0,0,0,0.08)] transition-all duration-300 animate-fadeIn h-full hover:rotate-1">
      <div className="relative">
        <Image
          className="h-[150px] object-cover rounded-t-xl w-[150px]"
          src={img1}
          alt={name} 
        />
        {!cartItems[id] ? (
          <Image
            className="absolute bottom-4 right-4 w-[35px] cursor-pointer rounded-full"
            onClick={() => addToCart(id)}
            src={img2}
            alt="Add to cart"
            width={35}
            height={35}
          />
        ) : (
          <div className="absolute bottom-4 right-4 flex items-center p-1 gap-2 rounded-full bg-white">
            <Image
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from cart"
              className="w-[30px] cursor-pointer"
              width={30}
              height={30}
            />
            <p className="text-gray-700">{cartItems[id]}</p>
            <Image
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add more"
              className="w-[30px] cursor-pointer"
              width={30}
              height={30}
            />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-xl font-medium">{name}</p>
          <Image
            src={assets.play_store}
            alt="Rating"
            className="w-[70px]"
            width={70}
            height={15} // Adjust height as needed based on aspect ratio of your image
          />
        </div>
        <p className="text-gray-600 text-xs">{description}</p>
        <p className="text-tomato text-2xl font-medium my-2.5">Rp. {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;