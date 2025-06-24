"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Assuming assets.ts contains your image imports
import { assets } from "../../assets/assets";
import { getSession } from "@/lib/session";
import SignInPanel from "../signInPanel";
import Profile from "../Profile";
import img from '../../assets/cart-3d-icon.png'

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

type Props = {};

const Navbar = (props: Props) => {
  const [session, setSession] = useState<any>(null);
  const [activeMenu, setActiveMenu] = useState<string>("home");
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get session on component mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession();
        setSession(sessionData);
      } catch (error) {
        console.error("Error fetching session:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Set active menu based on pathname
  useEffect(() => {
    if (pathname === "/") {
      setActiveMenu("home");
    }
  }, [pathname]);

  // Optional: Add scroll behavior for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Load cart items count from localStorage or API
  useEffect(() => {
    const loadCartCount = () => {
      if (typeof window !== 'undefined') {
        const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        setCartItemCount(cartItems.length);
      }
    };

    loadCartCount();
    
    // Listen for cart updates
    const handleCartUpdate = () => loadCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sticky top-0 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 z-50 shadow-2xl backdrop-blur-md w-full max-w-full border-b border-purple-500/20">
        <div className="w-[150px] h-8 bg-gray-700 animate-pulse rounded-lg"></div>
        <div className="flex gap-4">
          <div className="w-20 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
          <div className="w-20 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
          <div className="w-20 h-6 bg-gray-700 animate-pulse rounded-lg"></div>
        </div>
        <div className="w-24 h-8 bg-gray-700 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  return (
    <div
      className={`flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sticky top-0 
      bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 
      z-50 shadow-2xl backdrop-blur-md w-full max-w-full transition-all duration-300 
      border-b border-purple-500/20 ${
        isVisible ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <Link href="/" className="transform hover:scale-105 transition-transform duration-200">
        <Image
          src={assets.logo}
          alt="ShareBite Logo"
          className="w-[150px] sm:w-[140px] md:w-[120px] ml-[40px] drop-shadow-lg"
        />
      </Link>

      <ul className="list-none gap-8 text-white text-lg sm:text-base hidden md:flex">
        {Object.entries(navLinks).map(([menu, link]) => (
          <li
            key={menu}
            onClick={() => setActiveMenu(menu)}
            className={`cursor-pointer pb-1 transition-all duration-300 hover:text-purple-300 
            transform hover:scale-110 hover:-translate-y-1 relative group ${
              activeMenu === menu 
                ? "text-purple-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-400 after:to-pink-400 after:rounded-full" 
                : ""
            }`}
          >
            {link.startsWith("#") ? (
              <a href={link} className="font-medium tracking-wide">
                {capitalize(menu)}
              </a>
            ) : (
              <Link href={link} className="font-medium tracking-wide">
                {capitalize(menu)}
              </Link>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6 sm:gap-5 md:gap-4 mx-[40px]">
        {/* Enhanced Search Bar with 3D Icon */}
        <div className="group relative max-w-[290px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none">
            <Image
              src="/src/assets/search-3d-icon.png"
              alt="Search"
              width={20}
              height={20}
              className="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
            />
          </div>

          <input
            id="query"
            type="search"
            name="searchbar"
            placeholder="Search delicious food..."
            className="
              w-full h-12 pl-11 pr-4
              font-medium
              bg-gradient-to-r from-slate-800/80 to-slate-700/80 
              text-white placeholder:text-gray-400
              rounded-xl
              border border-purple-500/30
              shadow-[0_8px_32px_rgba(139,69,255,0.1)]
              outline-none
              transition-all duration-300 ease-out
              group-hover:shadow-[0_8px_32px_rgba(139,69,255,0.2)]
              group-hover:border-purple-400/50
              focus:shadow-[0_8px_32px_rgba(139,69,255,0.3)]
              focus:border-purple-400
              focus:bg-gradient-to-r focus:from-slate-700/90 focus:to-slate-600/90
              active:scale-[0.98]
              backdrop-blur-sm
            "
          />
        </div>

        {/* Enhanced Cart Icon with 3D Design */}
        <div className="relative group">
          <Link href="/cart" className="block transform hover:scale-110 transition-all duration-200">
            <div className="relative rounded-xl mr-[5px] transition-all duration-200 backdrop-blur-sm"
            >
              <Image
                src={img}
                alt="Shopping Cart"
                width={24}
                height={24}
                className="filter drop-shadow-lg"
              />
              {cartItemCount > 0 && (
                <div className="absolute -top-2 -right-2 min-w-[20px] min-h-[20px] bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg animate-pulse">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </div>
              )}
            </div>
          </Link>
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            View Cart ({cartItemCount} items)
          </div>
        </div>
      </div>

      {/* Enhanced User Profile/Sign In */}
      <div className="flex items-center">
        {session && session.user ? (
          <div className="relative group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-200 backdrop-blur-sm">
              <Profile user={session.user} />
            </div>
          </div>
        ) : (
          <div className="transform hover:scale-105 transition-transform duration-200">
            <SignInPanel />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

