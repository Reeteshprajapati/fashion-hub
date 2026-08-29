import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import Hero from "../../components/Hero";
import ProductCard from "../../components/ProductCard";
import QuickViewModal from "../../components/Modal";
import PageWrapper from "../../animations/PageWrapper";
import { FiArrowRight, FiShield, FiTruck, FiRefreshCw } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";

const Home = () => {
  const { products } = useShop();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Curate products for sections
  const trendingProducts = products.filter((p) => [1, 2, 5, 6].includes(p.id));
  const newArrivals = products.filter((p) => [3, 4, 7, 8].includes(p.id));
  const premiumProducts = products.filter((p) => [11, 13, 15].includes(p.id));

  const brands = [
    { name: "MAISON LUXE", desc: "PARIS" },
    { name: "NOIR & CO", desc: "MILAN" },
    { name: "AURA DESIGNS", desc: "TOKYO" },
    { name: "VERTU SELECTION", desc: "LONDON" },
    { name: "VALENTIN", desc: "ROMA" }
  ];

  const testimonials = [
    {
      quote: "The cashmere kimono is an heirloom piece. The weight, softness, and detailing are simply unmatched. A premium experience from purchase to delivery.",
      author: "Victoria P.",
      location: "New York"
    },
    {
      quote: "FashionHub captures the absolute essence of slow fashion. The structured wool coat fits like a glove and feels incredibly substantial.",
      author: "Marcus S.",
      location: "London"
    }
  ];

  return (
    <PageWrapper>
      {/* 1. Hero Section */}
      <Hero />

      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 py-16">
        {/* 2. Brand Showcase */}
        <section className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 py-8 border-y border-slate-200/50 dark:border-slate-800/40">
            {brands.map((b) => (
              <div key={b.name} className="flex flex-col items-center select-none group">
                <span
                  className="text-base md:text-xl font-light tracking-[0.25em] text-slate-400 group-hover:text-amber-500 dark:text-slate-500 transition-colors duration-300"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {b.name}
                </span>
                <span className="text-[8px] tracking-[0.3em] text-slate-500/70 font-mono mt-1">
                  {b.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Trending Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.3em] font-semibold text-amber-500 uppercase font-mono mb-2">
                Curated Selection
              </p>
              <h2 className="text-2xl md:text-3xl font-extralight tracking-widest text-slate-900 dark:text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                Trending Collection
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-widest font-semibold hover:text-amber-500 text-slate-500 transition-colors mt-4 md:mt-0 flex items-center space-x-1.5"
            >
              <span>View Full Catalog</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
            ))}
          </div>
        </section>

        {/* 4. Split Category Banner */}
        <section className="w-full mb-24 grid grid-cols-1 md:grid-cols-2">
          {/* Men's Banner */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[60vh] overflow-hidden group">
            <img
              src="/mens_collection.png"
              alt="Men Collection"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
            />
            <div className="absolute inset-0 bg-slate-100/10 group-hover:bg-slate-100/20 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10">
              <div className="bg-white/80 backdrop-blur-md border border-white/40 p-6 md:p-8 rounded-2xl shadow-xl max-w-sm transition-all duration-500 group-hover:translate-y-[-8px] group-hover:bg-white/95">
                <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-mono text-slate-500 mb-1.5 uppercase block">
                  Sartorial Tailoring
                </span>
                <h3 className="text-xl md:text-2xl font-light tracking-widest text-slate-900 mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                  MEN'S COLLECTION
                </h3>
                <Link
                  to="/shop?category=Men"
                  className="inline-block text-[10px] uppercase tracking-widest font-semibold py-2.5 px-5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors duration-300"
                >
                  Shop Men
                </Link>
              </div>
            </div>
          </div>

          {/* Women's Banner */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[60vh] overflow-hidden group border-t md:border-t-0 md:border-l border-slate-200">
            <img
              src="/womens_atelier.png"
              alt="Women Collection"
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95"
            />
            <div className="absolute inset-0 bg-slate-100/10 group-hover:bg-slate-100/20 transition-colors duration-500" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10">
              <div className="bg-white/80 backdrop-blur-md border border-white/40 p-6 md:p-8 rounded-2xl shadow-xl max-w-sm transition-all duration-500 group-hover:translate-y-[-8px] group-hover:bg-white/95">
                <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-mono text-slate-500 mb-1.5 uppercase block">
                  Modern Silhouette
                </span>
                <h3 className="text-xl md:text-2xl font-light tracking-widest text-slate-900 mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                  WOMEN'S ATELIER
                </h3>
                <Link
                  to="/shop?category=Women"
                  className="inline-block text-[10px] uppercase tracking-widest font-semibold py-2.5 px-5 bg-slate-900 text-white rounded-full hover:bg-slate-800 transition-colors duration-300"
                >
                  Shop Women
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 5. New Arrivals */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-[10px] tracking-[0.3em] font-semibold text-amber-500 uppercase font-mono mb-2">
                Seasonal Capsules
              </p>
              <h2 className="text-2xl md:text-3xl font-extralight tracking-widest text-slate-900 dark:text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                New Arrivals
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-xs uppercase tracking-widest font-semibold hover:text-amber-500 text-slate-500 transition-colors mt-4 md:mt-0 flex items-center space-x-1.5"
            >
              <span>Explore All</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
            ))}
          </div>
        </section>

        {/* 6. Premium Collection Section */}
        <section className="bg-slate-100 text-slate-900 py-20 mb-24 rounded-2xl border border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <p className="text-[10px] tracking-[0.3em] font-semibold text-slate-500 uppercase font-mono mb-2">
                Exclusive Selection
              </p>
              <h2 className="text-3xl font-extralight tracking-widest uppercase mb-4 text-slate-900" style={{ fontFamily: "'Cinzel', serif" }}>
                FASHIONHUB PREMIUM
              </h2>
              <div className="w-12 h-[1px] bg-slate-500 mx-auto my-4" />
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Handcrafted masterpieces with real gold embroidery threads, natural Swedish shearling leather, and grade-A pure Mongolian cashmere.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {premiumProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
              ))}
            </div>
          </div>
        </section>

        {/* 7. Value Propositions */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-y border-slate-200/50 dark:border-slate-800/40">
            <div className="flex flex-col items-center text-center px-4">
              <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-full text-amber-500 mb-4">
                <FiTruck className="w-6 h-6" />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-2">
                Global Priority Shipping
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                Enjoy duty-free express delivery worldwide. Beautifully packaged in reusable linen dust jackets.
              </p>
            </div>

            <div className="flex flex-col items-center text-center px-4 border-y md:border-y-0 md:border-x border-slate-200/50 dark:border-slate-800/40 py-8 md:py-0">
              <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-full text-amber-500 mb-4">
                <FiShield className="w-6 h-6" />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-2">
                LIFETIME CARE PROMISE
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                Every luxury item includes lifetime access to repair and styling consult services under slow fashion principles.
              </p>
            </div>

            <div className="flex flex-col items-center text-center px-4">
              <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-full text-amber-500 mb-4">
                <FiRefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xs uppercase tracking-widest font-semibold mb-2">
                EASY EXCHANGES
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                Try on our luxury sizing comfortably. Generous 30-day hassle-free pickup from your doorstep.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Testimonials */}
        <section className="max-w-4xl mx-auto px-6 text-center mb-12">
          <FaQuoteLeft className="w-8 h-8 text-amber-500/40 mx-auto mb-6" />
          <div className="flex flex-col space-y-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="pb-8 border-b border-slate-200/40 dark:border-slate-800/40 last:border-b-0">
                <p className="text-sm md:text-base italic leading-relaxed text-slate-600 dark:text-slate-350 max-w-2xl mx-auto mb-4 font-light">
                  "{t.quote}"
                </p>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-slate-800 dark:text-white">
                  {t.author} — <span className="text-amber-500">{t.location}</span>
                </h4>
              </div>
            ))}
          </div>
        </section>
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

export default Home;
