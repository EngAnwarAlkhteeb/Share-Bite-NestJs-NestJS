import React from "react";
import Image from "next/image"; // Import Image for optimized images
import { assets } from "../../assets/assets"; // Adjust path as needed
import navLinks from "@/components/Navbar/navLinks"; // Assuming navLinks is in a separate file

// Re-defining getId here or ensuring it's properly exported from the navLinks file
function getId(column: keyof typeof navLinks): string {
  return navLinks[column].replace("#", "");
}

const Footer: React.FC = () => {
  return (
    <footer
      id={getId("contact us")}
      className="bg-[#323232] text-[#d9d9d9] py-6 mt-0 font-inter"
    >
      <div className="container mx-auto px-4">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
          
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Image
              src={assets.logo}
              alt="ShareBite Logo"
              width={120}
              height={32}
              className="mb-3"
            />
            <p className="text-sm leading-relaxed text-[#d9d9d9]">
              Reduce food waste, save money. Connect with discounted quality food 
              from restaurants and help create a sustainable future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Menu</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +1-2255-5825
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ak2211.g@gmail.com
              </li>
            </ul>
            
            {/* Social Icons */}
            <div className="flex space-x-3 mt-4">
              <Image
                src={assets.facebook_icon}
                alt="Facebook"
                className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
                width={24}
                height={24}
              />
              <Image
                src={assets.twitter_icon}
                alt="Twitter"
                className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
                width={24}
                height={24}
              />
              <Image
                src={assets.linkedin_icon}
                alt="LinkedIn"
                className="w-6 h-6 cursor-pointer hover:opacity-80 transition-opacity"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-500 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-[#d9d9d9]">
            <p>&copy; 2024 ShareBite Team. All rights reserved.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-tomato transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-tomato transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;