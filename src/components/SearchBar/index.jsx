import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiX, FiArrowRight, FiSearch } from "react-icons/fi";
import { products } from "../../data/products";
import { motion } from "framer-motion";

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when search overlay is shown
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      setQuery("");
      setResults([]);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Live search matching
  useEffect(() => {
    if (query.trim().length > 1) {
      const filtered = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.subCategory.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5); // Limit results to 5
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const handleTrendingClick = (term) => {
    setQuery(term);
    navigate(`/shop?search=${encodeURIComponent(term)}`);
    onClose();
  };

  if (!isOpen) return null;

  const trendingSearches = ["Silk Drape Dress", "Virgin Wool", "Cashmere Kimono", "Organza princess Gown"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col justify-start pt-[10vh] px-6 md:px-12 text-slate-800"
    >
      {/* Top Header Controls */}
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center mb-16">
        <span className="text-[10px] tracking-[0.3em] font-light text-slate-500 uppercase">
          Live Catalog Search
        </span>
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-900 transition-colors p-2 rounded-full border border-slate-200 hover:border-slate-400 flex items-center justify-center"
          aria-label="Close search overlay"
        >
          <FiX className="w-5 h-5" />
        </button>
      </div>

      {/* Main Search Input Form */}
      <div className="max-w-4xl mx-auto w-full">
        <form onSubmit={handleSearchSubmit} className="relative w-full border-b border-slate-200 focus-within:border-slate-900 transition-colors py-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search fashionhub products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-2xl md:text-4xl font-extralight placeholder-slate-300 focus:outline-none pr-12 text-slate-900 tracking-wide"
          />
          <button
            type="submit"
            className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900 p-2"
          >
            <FiArrowRight className="w-6 h-6" />
          </button>
        </form>

        {/* Live Instant Results OR Trending Suggestions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left / Center: Instant Live Results */}
          <div className="md:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-6">
              {results.length > 0 ? "Instant Matches" : "Trending Collections"}
            </h3>

            {results.length > 0 ? (
              <div className="flex flex-col space-y-4">
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="flex items-center p-3 hover:bg-slate-100 rounded-lg border border-transparent hover:border-slate-200 transition-all duration-300 group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-16 object-cover rounded bg-slate-50 border border-slate-200/50 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="ml-4">
                      <span className="text-[10px] tracking-wider text-slate-500 uppercase font-light">
                        {product.brand}
                      </span>
                      <h4 className="text-sm font-light text-slate-800 group-hover:text-slate-950 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono text-slate-500 mt-0.5">
                        ${product.price}
                      </p>
                    </div>
                    <FiArrowRight className="ml-auto w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            ) : query.trim().length > 1 ? (
              <p className="text-sm text-slate-500 font-light">
                No matching luxury products found. Try something else.
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleTrendingClick(term)}
                    className="px-4 py-2 border border-slate-200 hover:border-slate-900 hover:text-slate-900 rounded-full text-xs font-light tracking-wider bg-slate-50 hover:bg-white transition-all duration-300"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Informational Luxury banner */}
          <div className="hidden md:flex flex-col bg-slate-100/50 border border-slate-200 rounded-xl p-6 justify-center">
            <h4 className="text-slate-800 font-semibold text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
              FashionHub Private Suite
            </h4>
            <p className="text-xs text-slate-650 font-light leading-relaxed mb-4">
              Explore custom sizes, high-end customization, and tailored fit consultation through our online live stylists.
            </p>
            <Link
              to="/shop"
              onClick={onClose}
              className="text-xs text-slate-850 hover:text-slate-950 flex items-center space-x-1.5 transition-colors uppercase tracking-widest font-mono font-semibold"
            >
              <span>View All Products</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchBar;
