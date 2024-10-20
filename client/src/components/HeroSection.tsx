import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

const HeroSection: React.FC = () => {
    const [searchText, setSearchText] = useState<string>(""); // Changed from {} to ()
  return (
    <div className="min-h-screen max-padd-container">
      <div className="flex flex-col items-center justify-between py-12 mx-auto gap-7 sm:py-24 lg:flex-row">
        {/* Left side - Text and Search */}
        <div className="w-full mb-8 lg:w-1/2 lg:mb-0">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl lg:text-6xl">
            Discover Delicious Food
          </h1>
          <p className="mb-8 text-xl text-gray-700 sm:text-2xl">
            Find and order your favorite meals from the best restaurants in town.
          </p>
          <div className="relative">
            <Input
              type="text"
              value={searchText}
              onChange={(e)=> setSearchText(e.target.value)}
              placeholder="Search for food or restaurants"
              className="w-full px-4 py-3 pr-12 text-gray-900 placeholder-gray-500 rounded-full outline-none"
            />
            <Button
              className="absolute p-2 -translate-y-1/2 rounded-full right-1 top-1/2"
              size="icon"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Right side - Food Picture */}
        <div className="flex justify-center w-full lg:w-1/2 lg:justify-end">
          <div className="relative w-full">
            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 blur-3xl opacity-70 animate-pulse"></div>
            <img
              src="/heroImg.jpg"
              alt="Delicious Food"
              className="relative z-10 w-full h-auto shadow-2xl rounded-3xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;