import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="">
        <div className="py-10 text-gray-300 bg-gray-900">
      <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-3 lg:grid-cols-4 max-padd-container">
        {/* Logo and Company Info */}
        <div className="mb-6">
          <h2 className="mb-3 text-xl font-bold text-white md:font-extrabold">FoodPalace</h2>
          <p className="text-sm">Find your dream home with ease. We provide you with exclusive property listings and seamless services.</p>
        </div>

        {/* Quick Links */}
        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/profile" className="hover:text-white">Profile</Link></li>
            <li><Link to="/order" className="hover:text-white">Order</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-sm mb-">
          <h3 className="mb-3 text-lg font-semibold text-white">Contact Us</h3>
          <ul className="space-y-2">
            <li>Email: info@homerental.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Real Estate St, City, Country</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-6 text-sm">
          <h3 className="mb-3 text-lg font-semibold text-white">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="p-2 transition rounded-full ">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className="p-2 transition rounded-full ">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className="p-2 transition rounded-full ">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" className="p-2 transition rounded-full ">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-8 text-sm text-center text-gray-500 border-t border-gray-700">
        <p>&copy; {new Date().getFullYear()} FoodPalace. All Rights Reserved.</p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
