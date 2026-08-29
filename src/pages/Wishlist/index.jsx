import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import ProductCard from "../../components/ProductCard";
import QuickViewModal from "../../components/Modal";
import PageWrapper from "../../animations/PageWrapper";
import { FiHeart, FiTrash2, FiShoppingBag, FiEye, FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Wishlist = () => {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  // Quick View States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <PageWrapper>
      <div className="pt-28 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extralight tracking-widest text-slate-900 dark:text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              MY COLLECTION CANVAS
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-light max-w-xl">
              A private catalog of your favorite pieces. Toggle saved items, trigger Quick View specifications, or place them directly into your shopping cart.
            </p>
          </div>

          {wishlist.length > 0 ? (
            /* Wishlist Products Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlist.map((product) => (
                <div key={product.id} className="relative group">
                  {/* Reuse ProductCard but add custom card features if we want, or keep it perfectly styled and reusable */}
                  <ProductCard product={product} onQuickView={handleQuickView} />

                  {/* Top-Right Absolute Delete Badge */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 bg-white/90 dark:bg-slate-950/80 p-2.5 rounded-full text-slate-400 hover:text-rose-500 hover:scale-105 transition-all shadow-md z-20 border border-slate-200/40 dark:border-slate-800/40 backdrop-blur-sm flex items-center justify-center clickable"
                    title="Remove from saved collection"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-24 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-amber-500/5 dark:bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 mb-6 border border-amber-500/20">
                <FiHeart className="w-6 h-6 animate-pulse" />
              </div>
              <h3 className="text-lg font-light text-slate-800 dark:text-white mb-2 uppercase tracking-wider">
                Collection Canvas is Empty
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mb-8 font-light leading-relaxed">
                You haven't curated any saved pieces yet. Explore our latest seasonal capsules and select favorite items.
              </p>
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-all shadow-md hover:scale-105 flex items-center space-x-2 clickable"
              >
                <span>Browse Atelier</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageWrapper>
  );
};

export default Wishlist;
