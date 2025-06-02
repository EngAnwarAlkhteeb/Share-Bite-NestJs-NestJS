"use client"; // Because we use useState in the parent (page.tsx) and it controls this component

import React from "react";
import Image from "next/image"; // For optimized images
import { menu_list } from "@/assets/assets"; // Adjust path as needed
import navLinks from "@/components/Navbar/navLinks"; // Assuming navLinks is in a separate file

// Props interface for TypeScript
interface ExploreMenuProps {
  category: string;
  setCategory: (category: string) => void;
}

// Re-defining getId here or ensuring it's properly exported from the navLinks file
function getId(column: keyof typeof navLinks): string {
  return navLinks[column].replace("#", "");
}

const ExploreMenu: React.FC<ExploreMenuProps> = ({ category, setCategory }) => {
  return (
    // <div
    //   className="flex flex-col gap-5 mt-10 md:mt-20 px-[max(5vw,12px)] "
    //   id={getId("menu")}
    // >
    //   <h1 className="text-[#262626] font-medium text-center text-4xl sm:text-3xl">
    //     Explore our Menu
    //   </h1>
    //   <p className="text-[#808080] text-center leading-normal max-w-full sm:text-sm">
    //     Reduce food waste, one bite at a time.
    //     <strong className="text-tomato"> ShareBite</strong> connects individuals
    //     and businesses <br />
    //     to donate surplus food to those in need.
    //     <br />
    //     Join the movement and positively impact the environment and your
    //     community.
    //   </p>
    //   <div className="flex justify-between items-start gap-[30px] text-center my-5 overflow-x-scroll no-scrollbar">
    //     {menu_list.map((item, index) => {
    //       return (
    //         <div
    //         //   onClick={() =>
    //         //     setCategory((prev) =>
    //         //       prev === item.menu_name ? "All" : item.menu_name
    //         //     )
    //         //   }
    //           key={index}
    //           className="flex flex-col items-center cursor-pointer min-w-[80px]"
    //         >
    //           <Image
    //             className={`w-[7.5vw] min-w-[80px] rounded-full transition-all duration-200 ${
    //               category === item.menu_name
    //                 ? "border-4 border-tomato p-[2px]"
    //                 : ""
    //             }`}
    //             src={item.menu_image}
    //             alt={item.menu_name} // Added alt text for accessibility
    //             width={100} // Example width, adjust as per your image size
    //             height={100} // Example height, adjust as per your image size
    //           />
    //           <p className="mt-[10px] text-[#747474] text-[max(1.4vw,16px)] cursor-pointer">
    //             {item.menu_name}
    //           </p>
    //         </div>
    //       );
    //     })}
    //   </div>
    //   <hr className="w-full h-[2px] my-2.5 bg-[#e2e2e2] border-none" />
    // </div>
    // );

    // <section className="bg-white/50 md:py-15 text-gray-900 h-[550px]">
    //   <div className="container mx-auto px-4" id={getId("menu")}>
    //     <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
    //       {/* Left Image - Chef */}
    //       {/* <div className="lg:w-1/3 flex justify-center lg:justify-start">
    //         <img
    //           src="https://placehold.co/400x500/FACC15/000?text=Chef+Cooking"
    //           alt="Chef Cooking"
    //           className="rounded-lg shadow-xl w-full max-w-md lg:max-w-none h-auto object-cover"
    //         />
    //       </div> */}

    //       {/* Middle Content */}
    //       <div className="lg:w-1/3 text-center lg:text-left">
    //         <p className="text-yellow-600 text-center text-lg mb-2 font-serif">
    //           Introduction of Restho
    //         </p>
    //         <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 font-serif">
    //           We Are Experienced Restaurant.
    //         </h2>
    //         <p className="text-gray-700 text-base md:text-lg mb-8">
    //           It was popularised in the 1960s with the release of Letraset
    //           sheets containing Lorem Ipsum passages, and more recently with
    //           desktop publishing software like Aldus PageMaker including
    //           versions of Lorem Ipsum.
    //         </p>

    //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
    //           <div>
    //             <h3 className="text-xl font-semibold text-yellow-600 mb-2">
    //               Our Mission
    //             </h3>
    //             <ul className="list-none space-y-2 text-gray-700">
    //               <li className="flex items-center">
    //                 <svg
    //                   className="w-5 h-5 mr-2 text-yellow-500"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //                 Delicious Food.
    //               </li>
    //               <li className="flex items-center">
    //                 <svg
    //                   className="w-5 h-5 mr-2 text-yellow-500"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //                 Cost Effective.
    //               </li>
    //               <li className="flex items-center">
    //                 <svg
    //                   className="w-5 h-5 mr-2 text-yellow-500"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //                 Clean Environment.
    //               </li>
    //             </ul>
    //           </div>
    //           <div>
    //             <h3 className="text-xl font-semibold text-yellow-600 mb-2">
    //               Our Strengths
    //             </h3>
    //             <ul className="list-none space-y-2 text-gray-700">
    //               <li className="flex items-center">
    //                 <svg
    //                   className="w-5 h-5 mr-2 text-yellow-500"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //                 Expert Chef.
    //               </li>
    //               <li className="flex items-center">
    //                 <svg
    //                   className="w-5 h-5 mr-2 text-yellow-500"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //                 Letraset Sheets.
    //               </li>
    //               <li className="flex items-center">
    //                 <svg
    //                   className="w-5 h-5 mr-2 text-yellow-500"
    //                   fill="currentColor"
    //                   viewBox="0 0 20 20"
    //                   xmlns="http://www.w3.org/2000/svg"
    //                 >
    //                   <path
    //                     fillRule="evenodd"
    //                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
    //                     clipRule="evenodd"
    //                   />
    //                 </svg>
    //                 Quality Food.
    //               </li>
    //             </ul>
    //           </div>
    //         </div>

    //         {/* Testimonial */}
    //         {/* <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
    //           <p className="text-gray-800 italic mb-4 text-lg">
    //             "Welcome our restaurant! Our Restaurant is the best as like
    //             delicious food, nutrition food etc in world-wide."
    //           </p>
    //           <div className="flex items-center justify-end">
    //             <img
    //               src="https://placehold.co/50x50/FACC15/000?text=Avatar"
    //               alt="Mr. Hamilton Avatar"
    //               className="w-12 h-12 rounded-full mr-4"
    //               onError={(e) => {
    //                 e.target.onerror = null;
    //                 e.target.src =
    //                   "https://placehold.co/50x50/FACC15/000?text=Error";
    //               }}
    //             />
    //             <div>
    //               <p className="font-semibold text-gray-900">Mr. Hamilton</p>
    //               <p className="text-sm text-gray-600">CEO & Founder</p>
    //             </div>
    //           </div>
    //         </div> */}
    //       </div>

    //       {/* Right Image - Grilled Steak */}
    //       <div className="lg:w-1/3 flex justify-center lg:justify-end">
    //         <img
    //           src="https://placehold.co/400x500/FACC15/000?text=Grilled+Steak"
    //           alt="Grilled Steak"
    //           className="rounded-lg shadow-xl w-full max-w-md lg:max-w-none h-auto object-cover"
    //           // onError={(e) => {
    //           //   e.target.onerror = null;
    //           //   e.target.src =
    //           //     "https://placehold.co/400x500/FACC15/000?text=Image+Error";
    //           // }}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section
      className="bg-white py-16 md:py-24 text-gray-900"
      id={getId("menu")}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Middle Content - now spanning more width */}
          <div className="lg:w-2/3 text-center lg:text-left">
            {" "}
            {/* Adjusted width to accommodate one image */}
            <p className="text-yellow-600 text-lg mb-2 font-serif text-end mb-[15p]">
              Introduction of ShareBite
            </p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 font-serif">
              We Are Experienced Restaurant.
            </h2>
            <p className="text-gray-700 text-base md:text-lg mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              consectetur aliquid optio eligendi iure, consequatur est quo
              aperiam sed consequuntur id mollitia nobis in illo sit minima
              labore rerum tempora!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                  Our Mission
                </h3>
                <ul className="list-none space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Delicious Food.
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Cost Effective.
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Clean Environment.
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-yellow-600 mb-2">
                  Our Strengths
                </h3>
                <ul className="list-none space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Expert Chef.
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Letraset Sheets.
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Quality Food.
                  </li>
                </ul>
              </div>
            </div>
            {/* Testimonial */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-8">
              <p className="text-gray-800 italic mb-4 text-lg">
                "Welcome our restaurant! Our Restaurant is the best as like
                delicious food, nutrition food etc in world-wide."
              </p>
              <div className="flex items-center justify-end">
                <img
                  src="https://placehold.co/50x50/FACC15/000?text=Avatar"
                  alt="Mr. Hamilton Avatar"
                  className="w-12 h-12 rounded-full mr-4"
                  // onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/50x50/FACC15/000?text=Error"; }}
                />
                <div>
                  <p className="font-semibold text-gray-900">Mr. Hamilton</p>
                  <p className="text-sm text-gray-600">CEO & Founder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image - Grilled Steak (now using the new component) */}
          {/* <GrilledSteakImage /> */}
        </div>
      </div>
    </section>
  );
};

export default ExploreMenu;
