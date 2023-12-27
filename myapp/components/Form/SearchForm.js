'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';

const SearchForm = () => {
  const router = useRouter();

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-full py-2 px-4 pl-10 outline-none w-full cursor-pointer"
        />
        <button
          className="absolute cursor-pointer left-2 top-1  text-gray-600 rounded-full p-2 transition duration-300 hover:bg-gray-400 focus:outline-none"
          onClick={() => {
          }}
        >
          <FiSearch />
        </button>
      </div>

      <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-md">
      </div>
    </div>
  );
};

export default SearchForm;
