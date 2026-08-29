import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiX, FiShoppingBag, FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useShop } from "../../context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [successMsg, setSuccessMsg] = useState("");

  // Initialize/reset states when product changes or modal opens
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "Free Size");
      setSelectedColor(product.colors[0] || null);
      setActiveImageIndex(0);
      setQuantity(1);
      setSuccessMsg("");
      document.body.style.overflow = "hidden"; // Prevent body scroll
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const favorited = isInWishlist(product.id);
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setSuccessMsg("ADDED TO CART");
    setTimeout(() => {
      setSuccessMsg("");
      onClose(); // Auto-close modal after successful quick add
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/60 rounded-2xl w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row z-10 font-light"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-amber-500 hover:scale-110 transition-all z-20 p-2 border border-slate-200/40 dark:border-slate-800/40 bg-white/70 dark:bg-slate-950/60 backdrop-blur-sm rounded-full"
            aria-label="Close Quick View"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Left Column: Image Previews */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800">
            {/* Active Display Image */}
            <div className="aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800/40">
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail Selectors (if secondary image exists) */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 mt-4 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 rounded overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? "border-amber-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover object-top" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Options */}
          <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
            <div>
              {/* Brand & Stars */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  {product.brand}
                </span>
                <div className="flex items-center text-amber-500 text-xs">
                  <FaStar className="w-3.5 h-3.5 mr-1" />
                  <span className="font-mono text-xs font-semibold">{product.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Product Name */}
              <h2 className="text-xl md:text-2xl font-light text-slate-900 dark:text-white tracking-wide mb-3">
                {product.name}
              </h2>

              {/* Price & Discounts */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 font-mono">
                  ${finalPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-sm line-through text-slate-400 font-mono">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs bg-amber-500/10 text-amber-500 font-mono px-2 py-0.5 rounded">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-5">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 block mb-2">
                    Select Color: {selectedColor?.name}
                  </span>
                  <div className="flex space-x-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                          selectedColor?.name === color.name ? "border-amber-500 scale-110 shadow-md" : "border-slate-200/50 dark:border-slate-800"
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 block mb-2">
                    Select Size: {selectedSize}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[32px] h-8 px-2 border rounded text-xs font-mono flex items-center justify-center transition-all ${
                          selectedSize === size
                            ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 scale-105 shadow-sm"
                            : "border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-800 dark:hover:border-slate-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6 flex items-center">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 mr-4">
                  Quantity:
                </span>
                <div className="flex items-center border border-slate-200 dark:border-slate-850 rounded-lg">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions Footer Section */}
            <div className="flex space-x-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!!successMsg}
                className="flex-grow py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2 clickable"
              >
                <FiShoppingBag className="w-4 h-4" />
                <span>{successMsg ? successMsg : "Add to Cart"}</span>
              </button>

              {/* Wishlist Toggle Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`px-4 rounded-xl border flex items-center justify-center transition-all clickable ${
                  favorited
                    ? "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/30"
                    : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500"
                }`}
                title={favorited ? "Remove from Saved" : "Save Item"}
              >
                <FiHeart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
              </button>
            </div>

            {/* Link to Full Details page */}
            <Link
              to={`/product/${product.id}`}
              onClick={onClose}
              className="text-center text-[10px] uppercase tracking-widest text-slate-400 hover:text-amber-500 mt-4 transition-colors underline decoration-dotted underline-offset-4"
            >
              View Full Product Canvas & Reviews
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
