import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  dropdownItems?: Array<{ name: string; href: string }>;
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#' },
  { name: 'Profile', href: '#' },
  { name: 'Order', href: '#' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const toggleDropdown = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0">
              <img className="w-auto h-8" src="/api/placeholder/32/32" alt="Logo" />
            </a>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {navItems.map((item, index) => (
              <div key={item.name} className="relative">
                {item.dropdownItems ? (
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                )}
                {item.dropdownItems && activeDropdown === index && (
                  <div className="absolute z-10 w-screen max-w-md px-2 mt-3 -ml-4 transform sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                      <div className="relative grid gap-6 px-5 py-6 bg-white sm:gap-8 sm:p-8">
                        {item.dropdownItems.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="flex items-start p-3 -m-3 rounded-lg hover:bg-gray-50"
                          >
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">{subItem.name}</p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center -mr-2 sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <div key={item.name}>
                {item.dropdownItems ? (
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="block w-full px-3 py-2 text-base font-medium text-left text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item.name}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                )}
                {item.dropdownItems && activeDropdown === index && (
                  <div className="pl-4">
                    {item.dropdownItems.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;