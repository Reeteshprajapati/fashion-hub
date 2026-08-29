import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiEye } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { useShop } from "../../context/ShopContext";
import { motion } from "framer-motion";

const ProductCard = ({ product, onQuickView }) => {
  const { toggleWishlist, isInWishlist, addToCart } = useShop();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const favorited = isInWishlist(product.id);
  const discountPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleCardClick = (e) => {
    // If the user clicked a button or active element, don't trigger card navigation
    if (e.target.closest("button") || e.target.closest("a") || e.target.closest(".clickable")) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white dark:bg-slate-900 border border-brand-border/60 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-surface dark:bg-slate-800">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Main Primary Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered && product.images[1] ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
          />

          {/* Hover Swapped Image */}
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Discount Tag */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-brand-espresso dark:text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded border border-white/40 dark:border-slate-700 shadow-sm z-10">
            {product.discount}% OFF
          </div>
        )}

        {/* Floating Quick Action Overlay - Cleaner & Centered */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out z-10 px-4">
          <button
            onClick={() => onQuickView(product)}
            className="p-2.5 bg-white/95 dark:bg-slate-800/95 text-brand-espresso dark:text-white rounded-full hover:bg-brand-espresso hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors shadow-lg backdrop-blur-sm clickable"
            title="Quick View"
          >
            <FiEye className="w-4 h-4" />
          </button>

          <button
            onClick={() => addToCart(product, 1)}
            className="p-2.5 bg-white/95 dark:bg-slate-800/95 text-brand-espresso dark:text-white rounded-full hover:bg-brand-espresso hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-colors shadow-lg backdrop-blur-sm clickable"
            title="Add to Cart"
          >
            <FiShoppingBag className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleWishlist(product)}
            className={`p-2.5 rounded-full transition-colors shadow-lg backdrop-blur-sm clickable ${
              favorited
                ? "bg-brand-rose text-white"
                : "bg-white/95 dark:bg-slate-800/95 text-brand-espresso dark:text-white hover:bg-brand-rose hover:text-white"
            }`}
            title={favorited ? "Remove from Wishlist" : "Save to Wishlist"}
          >
            <FiHeart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Product Details Area - Streamlined */}
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-[10px] tracking-widest font-medium text-brand-muted dark:text-slate-400 uppercase">
            {product.brand}
          </span>
          <div className="flex items-center text-brand-muted dark:text-slate-400">
            <FaStar className="w-3 h-3 mr-1 text-brand-tan" />
            <span className="text-[11px] font-medium">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="text-sm font-medium text-brand-espresso dark:text-brand-linen hover:text-brand-tan dark:hover:text-brand-tan transition-colors line-clamp-1 mb-3"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-center space-x-2">
          <span className="text-sm font-semibold text-brand-espresso dark:text-white">
            ${discountPrice.toFixed(2)}
          </span>
          {product.discount > 0 && (
            <span className="text-xs line-through text-brand-muted dark:text-slate-500">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
