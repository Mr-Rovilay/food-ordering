import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const FooterLink = ({ to, children }) => (
  <Link 
    to={to} 
    className="transition-colors duration-200 hover:text-primary hover:underline decoration-primary decoration-2 underline-offset-4"
  >
    {children}
  </Link>
);

const SocialIcon = ({ href, icon: Icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="p-3 transition-colors duration-200 bg-gray-800 rounded-full hover:bg-primary hover:text-white group"
  >
    <Icon className="w-4 h-4" />
  </a>
);

const ContactItem = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-3">
    <Icon className="flex-shrink-0 w-5 h-5 text-green" />
    <span>{children}</span>
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="text-gray-300 bg-gray-900 max-padd-container">
      <div className="">
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="space-y-3">
                <h2 className="text-xl font-bold md:font-extrabold">
                  Food<span className="text-green">Palace</span>
                </h2>
                <p className="text-sm leading-relaxed md:text-lg">
                  Discover a world of delicious cuisine delivered right to your doorstep. 
                  Fresh ingredients, authentic flavors, and seamless service.
                </p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex gap-3 pt-4">
                <SocialIcon href="https://facebook.com" icon={FaFacebookF} />
                <SocialIcon href="https://twitter.com" icon={FaTwitter} />
                <SocialIcon href="https://instagram.com" icon={FaInstagram} />
                <SocialIcon href="https://linkedin.com" icon={FaLinkedinIn} />
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white md:text-lg">Quick Links</h3>
              <ul className="space-y-3">
                <li><FooterLink to="/">Home</FooterLink></li>
                <li><FooterLink to="/menu">Our Menu</FooterLink></li>
                <li><FooterLink to="/profile">My Profile</FooterLink></li>
                <li><FooterLink to="/orders">Track Order</FooterLink></li>
                <li><FooterLink to="/about">About Us</FooterLink></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white md:text-lg">Support</h3>
              <ul className="space-y-3 text-sm">
                <li><FooterLink to="/faq">FAQ</FooterLink></li>
                <li><FooterLink to="/shipping">Shipping Policy</FooterLink></li>
                <li><FooterLink to="/refund">Refund Policy</FooterLink></li>
                <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
                <li><FooterLink to="/terms">Terms of Service</FooterLink></li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <ContactItem icon={FaMapMarkerAlt}>
                  123 Food Street, Cuisine City, FC 12345
                </ContactItem>
                <ContactItem icon={FaPhoneAlt}>
                  +1 (234) 567-8900
                </ContactItem>
                <ContactItem icon={FaEnvelope}>
                  support@foodpalace.com
                </ContactItem>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 text-sm text-center border-t border-gray-800">
          <p>
            &copy; {currentYear} FoodPalace. All rights reserved. 
            <span className="block sm:inline sm:ml-1">
              Crafted with ❤️ for food lovers.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;