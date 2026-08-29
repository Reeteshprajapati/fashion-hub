import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiHeart, FiShoppingBag, FiMenu, FiX, FiSun, FiMoon, FiChevronDown } from "react-icons/fi";
import { useShop } from "../../context/ShopContext";
import { useTheme } from "../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ onSearchOpen }) => {
  const { cartCount, wishlist } = useShop();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState(false);
  const location = useLocation();

  // Scroll handler for transparent to blur background transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
  ];

  const categories = {
    Men: ["T-Shirts", "Shirts", "Jeans", "Hoodies", "Jackets"],
    Women: ["Dresses", "Tops", "Skirts", "Kurtis", "Sarees"],
    Kids: ["Boys Wear", "Girls Wear", "Baby Fashion"],
    Premium: ["Designer Wear", "Limited Edition", "Exclusive Collection"],
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-brand-linen/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-brand-border/50 dark:border-slate-800/50 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extralight tracking-[0.15em] text-brand-espresso dark:text-white"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Fashion<span className="text-brand-tan font-semibold">Hub</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-xs uppercase tracking-widest font-light transition-colors duration-300 hover:text-slate-950 ${
                  location.pathname === link.path
                    ? "text-slate-950 font-normal"
                    : "text-slate-700"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 w-full h-[1px] bg-slate-900"
                  />
                )}
              </Link>
            ))}

            {/* Mega Menu Category Trigger */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMega(true)}
              onMouseLeave={() => setActiveMega(false)}
            >
              <button className="flex items-center space-x-1 text-xs uppercase tracking-widest font-light text-slate-700 hover:text-slate-950 transition-colors duration-300">
                <span>Collections</span>
                <FiChevronDown className="w-3 h-3" />
              </button>

              {/* Mega Menu Panel */}
              <AnimatePresence>
                {activeMega && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-white border border-slate-200/60 shadow-xl rounded-lg p-6 grid grid-cols-4 gap-6 z-50"
                  >
                    {Object.entries(categories).map(([cat, subs]) => (
                      <div key={cat} className="flex flex-col">
                        <Link
                          to={`/shop?category=${cat}`}
                          onClick={() => setActiveMega(false)}
                          className="text-[11px] font-semibold uppercase tracking-widest text-slate-600 mb-3 block hover:underline"
                        >
                          {cat}
                        </Link>
                        <div className="flex flex-col space-y-2">
                          {subs.map((sub) => (
                            <Link
                              key={sub}
                              to={`/shop?category=${cat}&sub=${sub}`}
                              onClick={() => setActiveMega(false)}
                              className="text-xs text-slate-500 hover:text-slate-900 transition-colors duration-200 font-light"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Live Search Icon */}
            <button
              onClick={onSearchOpen}
              className="text-slate-700 hover:text-slate-950 transition-colors duration-300 p-1"
              aria-label="Search Catalog"
            >
              <FiSearch className="w-[18px] h-[18px]" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="text-slate-700 hover:text-slate-950 transition-colors duration-300 p-1 relative"
              aria-label="View Wishlist"
            >
              <FiHeart className="w-[18px] h-[18px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-slate-800 text-white rounded-full flex items-center justify-center text-[9px] font-mono leading-none">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Shopping Cart Link */}
            <Link
              to="/cart"
              className="text-slate-700 hover:text-slate-950 transition-colors duration-300 p-1 relative"
              aria-label="View Cart"
            >
              <FiShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-slate-800 text-white rounded-full flex items-center justify-center text-[9px] font-mono leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Actions & Hamburger */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="text-slate-700 p-1 relative">
              <FiShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-slate-800 text-white rounded-full flex items-center justify-center text-[9px] font-mono">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 p-1"
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[280px] bg-slate-50 shadow-2xl z-30 p-6 flex flex-col md:hidden pt-28"
            >
              <div className="flex flex-col space-y-6">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-widest text-slate-800 hover:text-slate-950 font-light"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-widest text-slate-800 hover:text-slate-950 font-light"
                >
                  Shop
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-widest text-slate-800 hover:text-slate-950 font-light"
                >
                  Wishlist ({wishlist.length})
                </Link>

                <div className="h-[1px] bg-slate-200 my-2" />

                {/* Categories */}
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-500">
                  Shop Collections
                </span>
                {Object.keys(categories).map((cat) => (
                  <Link
                    key={cat}
                    to={`/shop?category=${cat}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900 pl-2"
                  >
                    {cat}
                  </Link>
                ))}
              </div>

              <div className="mt-auto pt-6 flex flex-col space-y-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onSearchOpen();
                  }}
                  className="flex items-center space-x-2 text-xs uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <FiSearch className="w-4 h-4" />
                  <span>Search Products</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
