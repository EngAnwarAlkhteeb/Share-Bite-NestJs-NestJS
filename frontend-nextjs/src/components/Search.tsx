import React from "react";

const Search = () => {
  return (
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
  );
};

export default Search;
