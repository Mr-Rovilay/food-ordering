import React, { useState } from 'react';
import { Search, UtensilsCrossed, Clock, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface PopularSearch {
  text: string;
  icon: string;
}

const HeroSection: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const popularSearches: PopularSearch[] = [
    { text: "Pizza", icon: "🍕" },
    { text: "Sushi", icon: "🍱" },
    { text: "Burger", icon: "🍔" },
    { text: "Salad", icon: "🥗" },
  ];

  const stats = [
    { icon: UtensilsCrossed, label: "1000+ Restaurants", color: "text-orange-500" },
    { icon: Clock, label: "30min Delivery", color: "text-blue-500" },
    { icon: Star, label: "4.8 Rating", color: "text-yellow-500" },
  ];

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate(`/search/${searchText}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative mt-16 overflow-hidden bg-gradient-to-b from-orange-50 to-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute bg-orange-300 rounded-full top-20 left-10 w-72 h-72 mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute bg-yellow-300 rounded-full top-40 right-10 w-72 h-72 mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bg-pink-300 rounded-full -bottom-8 left-20 w-72 h-72 mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-padd-container">
        <div className="flex flex-col items-center justify-between gap-12 py-16 lg:flex-row lg:py-24">
          {/* Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full space-y-8 lg:w-1/2"
          >
            {/* Hero Title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                Discover
                <span className="text-green"> Delicious</span>
                <br />
                Food Near You
              </h1>
              <p className="max-w-lg text-lg text-gray-600 sm:text-xl">
                From local favorites to culinary adventures, find and order the perfect meal for any moment.
              </p>
            </div>

            {/* Search Section */}
            <div className="relative max-w-xl">
              <div className={`relative transition-shadow duration-200 ${
                isSearchFocused ? 'shadow-lg' : 'shadow-md'
              } rounded-full`}>
                <Input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyPress={handleKeyPress}
                  placeholder="Search for food or restaurants..."
                  className="w-full py-6 pl-6 pr-16 text-sm border-none rounded-full ring-2 ring-transparent focus:ring-orange-500"
                />
                <Button
                  onClick={handleSearch}
                  className="absolute p-6 text-white -translate-y-1/2 bg-orange-500 rounded-full right-2 top-1/2 hover:bg-orange-600"
                >
                  <Search className="w-5 h-5" />
                </Button>
              </div>

              {/* Popular Searches */}
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-gray-500">Popular:</span>
                {popularSearches.map((item, index) => (
                  <Button
                    key={index}
                    onClick={() => setSearchText(item.text)}
                    className="inline-flex items-center gap-1 px-3 text-sm text-black transition-colors bg-white border border-gray-200 rounded-full hover:border-orange-500 hover:text-orange-500"
                  >
                    <span>{item.icon}</span>
                    {item.text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex flex-wrap gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute inset-0 translate-x-3 translate-y-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-3xl blur-xl opacity-30" />
              
              {/* Main image */}
              <img
                src="/heroImg.jpg"
                alt="Delicious Food Spread"
                className="relative object-cover w-full h-auto shadow-xl rounded-3xl"
              />

              {/* Floating cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute p-4 bg-white shadow-xl -bottom-6 -left-1 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full">
                    <UtensilsCrossed className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Fast Delivery</p>
                    <p className="text-sm text-gray-500">30 min or free</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute p-4 bg-white shadow-xl -top-6 -right-1 rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                    <Star className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Top Rated</p>
                    <p className="text-sm text-gray-500">4.8/5 average</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;