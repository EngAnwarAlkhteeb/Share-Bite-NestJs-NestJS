"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // For client-side transitions
import { usePathname } from "next/navigation"; // To get the current path for active link

// Assuming assets.ts contains your image imports
import { assets } from "@/assets/assets";
import { SlBasketLoaded } from "react-icons/sl";

// Define the type for navLinks
interface NavLinks {
  [key: string]: string;
}

const navLinks: NavLinks = {
  home: "/",
  menu: "#explore-menu",
  "mobile app": "#AppDownload",
  "contact us": "#Footer",
};

function capitalize(word: string): string {
  const words = word.split(" ");
  return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>("home"); // State to manage active menu item
  const pathname = usePathname(); // Get current pathname from Next.js
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    if (pathname === "/") {
      setActiveMenu("home");
    }
  }, [pathname]);

  return (
    <div
      className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sticky top-0 bg-[#101828] 
     z-50 shadow-lg backdrop-blur-md w-full max-w-full"
    >
      <Link href="/">
        <Image
          src={assets.logo}
          alt="Logo"
          className="w-[150px] sm:w-[140px] md:w-[120px] ml-[40px]"
        />
      </Link>
      <ul className="list-none gap-5 text-white text-lg sm:text-base hidden md:flex">
        {Object.entries(navLinks).map(([menu, link]) => (
          <li
            key={menu}
            onClick={() => setActiveMenu(menu)}
            className={`cursor-pointer pb-0.5 ${
              activeMenu === menu
                ? "border-b-2 text-white border-[white] text-black"
                : ""
            }`}
          >
            {/* For hash links, use regular <a> tags or a custom scroll-to-section function */}
            {link.startsWith("#") ? (
              <a href={link}>{capitalize(menu)}</a>
            ) : (
              <Link href={link}>{capitalize(menu)}</Link>
            )}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-10 sm:gap-7 md:gap-5 mx-[40px]">
        <div className="group relative max-w-[290px]">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
          >
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              fill="currentColor"
            />
          </svg>

          <input
            id="query"
            type="search"
            name="searchbar"
            placeholder="Search..."
            className="
          w-full h-11 pl-10
          font-montserrat
          bg-gray-800 text-gray-300 placeholder:text-gray-500
          rounded-lg
          shadow-[0_0_0_1.5px_#2b2c37,0_0_25px_-17px_#000]
          outline-none
          transition-all duration-200 ease-out
          group-hover:shadow-[0_0_0_2.5px_#2f303d,0_0_25px_-15px_#000]
          focus:shadow-[0_0_0_2.5px_#2f303d]
          active:scale-95
        "
          />
        </div>
        <div className="relative">
          <Link href="/cart">
            <SlBasketLoaded className="w-[24px] sm:w-[22px] md:w-[20px] w-[42px] h-[42px] " />

            {/* <Image
              src={assets.basket_icon}
              alt="Basket"
              className="w-[24px] sm:w-[22px] md:w-[20px]"
            /> */}
          </Link>
          {/* You'll need to pass getTotalCartAmount from a context or prop if it's still used */}
          {/* For now, assuming getTotalCartAmount() is replaced or handled differently */}
          {/* <div className={getTotalCartAmount() === 0 ? "" : "absolute min-w-[10px] min-h-[10px] bg-tomato rounded-full top-[-8px] right-[-8px]"}></div> */}
          <div className="absolute min-w-[10px] min-h-[10px] bg-tomato rounded-full top-[-8px] right-[-8px]"></div>{" "}
          {/* Placeholder dot */}
        </div>
        {/* Removed login/logout button and profile dropdown as per request */}
      </div>
    </div>
  );
};

export default Navbar;
