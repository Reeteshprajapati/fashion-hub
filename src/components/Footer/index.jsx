import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiArrowRight } from "react-icons/fi";
import { FaPinterestP } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-100 text-slate-700 border-t border-slate-200/60 py-16 px-6 font-light">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Column 1: Brand details */}
        <div className="flex flex-col space-y-4">
          <Link
            to="/"
            className="text-2xl font-extralight tracking-[0.15em] text-slate-900"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Fashion<span className="text-slate-500 font-semibold">Hub</span>
          </Link>
          <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
            Crafting luxury, organic, and premium apparel designed for slow fashion, modern silhouettes, and meticulous tailoring.
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors p-2 border border-slate-200 hover:border-slate-400 rounded-full"
              aria-label="Instagram"
            >
              <FiInstagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors p-2 border border-slate-200 hover:border-slate-400 rounded-full"
              aria-label="Pinterest"
            >
              <FaPinterestP className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors p-2 border border-slate-200 hover:border-slate-400 rounded-full"
              aria-label="Facebook"
            >
              <FiFacebook className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-slate-900 transition-colors p-2 border border-slate-200 hover:border-slate-400 rounded-full"
              aria-label="Twitter"
            >
              <FiTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Collections links */}
        <div>
          <h3 className="text-slate-900 text-xs uppercase tracking-[0.2em] font-semibold mb-5">
            Collections
          </h3>
          <div className="flex flex-col space-y-2.5 text-xs">
            <Link to="/shop?category=Women" className="hover:text-slate-900 transition-colors">
              Women's Atelier
            </Link>
            <Link to="/shop?category=Men" className="hover:text-slate-900 transition-colors">
              Men's Sartorial
            </Link>
            <Link to="/shop?category=Kids" className="hover:text-slate-900 transition-colors">
              Luxury Kids
            </Link>
            <Link to="/shop?category=Premium" className="hover:text-slate-900 transition-colors">
              Exclusive & Limited
            </Link>
          </div>
        </div>

        {/* Column 3: Services */}
        <div>
          <h3 className="text-slate-900 text-xs uppercase tracking-[0.2em] font-semibold mb-5">
            Bespoke Services
          </h3>
          <div className="flex flex-col space-y-2.5 text-xs">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Styling Appointments
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Corporate Gifting
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Shipping & Custom Duties
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              Lifetime Care & Repair
            </a>
          </div>
        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-slate-900 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
            Private Newsletter
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            Subscribe to receive exclusive access to capsule collection releases, private sales, and fashion editorials.
          </p>
          <form onSubmit={handleSubscribe} className="relative border-b border-slate-350 focus-within:border-slate-900 transition-colors py-2 flex items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent text-xs w-full focus:outline-none pr-10 text-slate-900 placeholder-slate-400 tracking-wider"
            />
            <button
              type="submit"
              className="absolute right-0 text-slate-500 hover:text-slate-900 p-1"
              aria-label="Submit email subscription"
            >
              <FiArrowRight className="w-4 h-4" />
            </button>
          </form>
          {subscribed && (
            <p className="text-[10px] text-slate-900 font-mono tracking-widest mt-2 animate-pulse">
              WELCOME TO FASHIONHUB.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200/60 pt-8 flex flex-col md:flex-row items-center justify-between text-[10px] text-slate-500 tracking-widest">
        <p>&copy; {new Date().getFullYear()} FASHIONHUB INC. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 uppercase">
          <a href="#" className="hover:text-slate-900 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-slate-900 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-slate-900 transition-colors">
            Accessibility
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
