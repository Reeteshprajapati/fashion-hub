import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import ProductCard from "../../components/ProductCard";
import Filters from "../../components/Filters";
import QuickViewModal from "../../components/Modal";
import PageWrapper from "../../animations/PageWrapper";
import { FiSliders, FiGrid, FiList, FiX, FiRefreshCw } from "react-icons/fi";

const Shop = () => {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States synced with URL query or initialized empty
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState(1500);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [sortBy, setSortBy] = useState("featured");

  // Pagination & Loading States
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Quick View States
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mobile Filters drawer
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Synchronize category or search query from URL parameters
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    }

    const sub = searchParams.get("sub");
    if (sub) {
      // If a subcategory mega-menu was clicked, let's treat it as a query filter
      setSearchQuery(sub);
    }

    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Handle Quick View trigger
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setPriceRange(1500);
    setSelectedRating(0);
    setSelectedColors([]);
    setSelectedSizes([]);
    setSearchQuery("");
    setSearchParams({});
  };

  // Active filter count for styling badges
  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    selectedBrands.length +
    (priceRange < 1500 ? 1 : 0) +
    (selectedRating > 0 ? 1 : 0) +
    selectedColors.length +
    selectedSizes.length +
    (searchQuery ? 1 : 0);

  // Filter and sort catalog
  const filteredProducts = products.filter((product) => {
    // 1. Category Filter
    if (selectedCategory && product.category !== selectedCategory) return false;

    // 2. Brand Filter (Multi-select)
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;

    // 3. Price Filter (Upper bound)
    const finalPrice = product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price;
    if (finalPrice > priceRange) return false;

    // 4. Rating Filter (Lower bound)
    if (selectedRating > 0 && product.rating < selectedRating) return false;

    // 5. Colors Filter (Multi-select)
    if (selectedColors.length > 0) {
      const hasColorMatch = product.colors.some((color) =>
        selectedColors.some(
          (selColName) =>
            color.name.toLowerCase().includes(selColName.toLowerCase()) ||
            selColName.toLowerCase().includes(color.name.toLowerCase())
        )
      );
      if (!hasColorMatch) return false;
    }

    // 6. Sizes Filter (Multi-select)
    if (selectedSizes.length > 0) {
      const hasSizeMatch = product.sizes.some((size) => selectedSizes.includes(size));
      if (!hasSizeMatch) return false;
    }

    // 7. Search Query Text Filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchText =
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.subCategory.toLowerCase().includes(q);
      if (!matchText) return false;
    }

    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
    const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;

    if (sortBy === "price-low") {
      return priceA - priceB;
    }
    if (sortBy === "price-high") {
      return priceB - priceA;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // Default Featured (id order)
  });

  // Paginated display subset
  const displayedProducts = sortedProducts.slice(0, visibleCount);

  // Load More simulation
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setIsLoadingMore(false);
    }, 800);
  };

  return (
    <PageWrapper>
      <div className="pt-28 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header & Sub-tagline */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extralight tracking-widest text-slate-900 dark:text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              THE ATELIER CANVAS
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-light max-w-xl">
              Curated premium apparel designed with absolute precision. Use the accordion controls to tailor your custom matching catalog view.
            </p>
          </div>

          {/* Active Filter Chips & Sorting Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/50 dark:border-slate-800/40 mb-8 gap-4">
            {/* Filter Toggle Buttons & Stats */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex md:hidden items-center space-x-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all shadow-sm active:scale-95"
              >
                <FiSliders className="w-4 h-4 text-amber-500" />
                <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              </button>

              <span className="text-xs text-slate-500 dark:text-slate-400 font-light font-mono">
                Showing {displayedProducts.length} of {sortedProducts.length} unique pieces
              </span>

              {/* Reset Chip */}
              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center space-x-1 text-[10px] uppercase tracking-widest font-semibold text-amber-500 hover:text-amber-600 transition-colors pl-2"
                >
                  <FiX className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Sorting controls */}
            <div className="flex items-center space-x-3 self-end md:self-auto">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850 text-xs px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-350 focus:outline-none focus:border-amber-500 transition-all font-light"
              >
                <option value="featured">Featured Atelier</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
            </div>
          </div>

          {/* Core Catalog Double Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Desktop Filters Column */}
            <div className="hidden lg:block lg:col-span-1 self-start sticky top-28">
              <Filters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                onReset={handleResetFilters}
              />
            </div>

            {/* Product Grid Column */}
            <div className="lg:col-span-3 flex flex-col">
              {displayedProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
                    ))}
                  </div>

                  {/* Load More Trigger Button */}
                  {visibleCount < sortedProducts.length && (
                    <button
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                      className="mt-16 mx-auto px-8 py-3.5 border border-slate-200 dark:border-slate-800 hover:border-amber-500 rounded-full text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:text-amber-500 bg-white dark:bg-slate-900 transition-all duration-300 flex items-center space-x-2.5 shadow-sm active:scale-95 disabled:opacity-50 clickable"
                    >
                      {isLoadingMore ? (
                        <>
                          <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Preparing Canvas...</span>
                        </>
                      ) : (
                        <span>Load More Collection</span>
                      )}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-8 flex flex-col items-center">
                  <span className="text-4xl text-amber-500 mb-4">𐏔</span>
                  <h3 className="text-lg font-light text-slate-800 dark:text-white mb-2">
                    No Matching Canvas Pieces
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mb-6 font-light">
                    Try broadening your filters, adjusting the price sliders, or clearing the search keywords.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs uppercase tracking-widest font-semibold rounded-full hover:bg-amber-500 dark:hover:bg-amber-500 dark:hover:text-white transition-colors clickable"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Slide-Up Filters Panel */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
          <div
            onClick={() => setShowMobileFilters(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          <div className="relative bg-white dark:bg-slate-900 w-full max-h-[85vh] overflow-y-auto rounded-t-3xl p-6 z-10 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                Tailor Catalog Filters
              </span>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-1 hover:text-amber-500 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto">
              <Filters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                selectedSizes={selectedSizes}
                setSelectedSizes={setSelectedSizes}
                onReset={handleResetFilters}
              />
            </div>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="mt-6 w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95"
            >
              Apply Filter Canvas
            </button>
          </div>
        </div>
      )}

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </PageWrapper>
  );
};

export default Shop;
