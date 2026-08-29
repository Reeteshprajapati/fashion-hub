import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiX, FiFilter } from "react-icons/fi";

const Filters = ({
  selectedCategory,
  setSelectedCategory,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  selectedRating,
  setSelectedRating,
  selectedColors,
  setSelectedColors,
  selectedSizes,
  setSelectedSizes,
  onReset
}) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    brands: true,
    rating: true,
    colors: true,
    sizes: true
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const categories = ["Men", "Women", "Kids", "Premium"];
  const brands = ["MAISON LUXE", "NOIR & CO", "AURA DESIGNS", "VERTU SELECTION", "VALENTIN", "LUXE KIDS"];
  const ratings = [
    { label: "4.5★ & Above", value: 4.5 },
    { label: "4.0★ & Above", value: 4.0 },
    { label: "3.5★ & Above", value: 3.5 }
  ];
  const colors = [
    { name: "Obsidian Noir", hex: "#0F172A" },
    { name: "Crisp Blue/Emerald", hex: "#BFDBFE" },
    { name: "Camel/Oatmeal", hex: "#B45309" },
    { name: "Champagne/Gold", hex: "#D97706" },
    { name: "Emerald/Sage", hex: "#047857" },
    { name: "Pure Chalk/White", hex: "#FFFFFF" }
  ];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // Toggle brand selection
  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand));
    } else {
      setSelectedBrands((prev) => [...prev, brand]);
    }
  };

  // Toggle color selection
  const handleColorToggle = (colorName) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors((prev) => prev.filter((c) => c !== colorName));
    } else {
      setSelectedColors((prev) => [...prev, colorName]);
    }
  };

  // Toggle size selection
  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes((prev) => prev.filter((s) => s !== size));
    } else {
      setSelectedSizes((prev) => [...prev, size]);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm font-light">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-850 mb-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider flex items-center text-slate-800 dark:text-white">
          <FiFilter className="w-4 h-4 mr-2 text-amber-500" />
          <span>Filters</span>
        </h3>
        <button
          onClick={onReset}
          className="text-[11px] uppercase tracking-widest font-semibold text-slate-400 hover:text-amber-500 transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="flex flex-col space-y-6">
        {/* Section 1: Categories */}
        <div className="border-b border-slate-100 dark:border-slate-850 pb-5">
          <button
            onClick={() => toggleSection("categories")}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200 mb-3"
          >
            <span>Category</span>
            {openSections.categories ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
          </button>
          {openSections.categories && (
            <div className="flex flex-col space-y-2.5 mt-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`text-left text-xs transition-colors pl-2 py-0.5 rounded ${
                  selectedCategory === ""
                    ? "text-amber-500 font-semibold bg-amber-500/5"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                All Collections
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-xs transition-colors pl-2 py-0.5 rounded ${
                    selectedCategory === cat  
                      ? "text-amber-500 font-semibold bg-amber-500/5"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat} Collection
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Section 2: Max Price */}
        <div className="border-b border-slate-100 dark:border-slate-850 pb-5">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200 mb-3"
          >
            <span>Max Price (${priceRange})</span>
            {openSections.price ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
          </button>
          {openSections.price && (
            <div className="mt-4 px-2">
              <input
                type="range"
                min="50"
                max="1500"
                step="50"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-200 dark:bg-slate-800 h-[3px] rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                <span>$50</span>
                <span>$1,500</span>
              </div>
            </div>
          )}
        </div>

        {/* Section 3: Luxury Brands */}
        <div className="border-b border-slate-100 dark:border-slate-850 pb-5">
          <button
            onClick={() => toggleSection("brands")}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200 mb-3"
          >
            <span>Brand Atelier</span>
            {openSections.brands ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
          </button>
          {openSections.brands && (
            <div className="flex flex-col space-y-2 mt-2">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer select-none py-0.5"
                >
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="mr-2.5 rounded border-slate-300 text-amber-500 focus:ring-amber-500 accent-amber-500 w-3.5 h-3.5"
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Section 4: Colors */}
        <div className="border-b border-slate-100 dark:border-slate-850 pb-5">
          <button
            onClick={() => toggleSection("colors")}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200 mb-3"
          >
            <span>Color Palette</span>
            {openSections.colors ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
          </button>
          {openSections.colors && (
            <div className="flex flex-wrap gap-2.5 mt-2">
              {colors.map((color) => {
                const isActive = selectedColors.includes(color.name);
                return (
                  <button
                    key={color.name}
                    onClick={() => handleColorToggle(color.name)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isActive ? "border-amber-500 scale-110 shadow-sm" : "border-slate-200 dark:border-slate-850"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Section 5: Sizes */}
        <div className="border-b border-slate-100 dark:border-slate-850 pb-5">
          <button
            onClick={() => toggleSection("sizes")}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200 mb-3"
          >
            <span>Sizes</span>
            {openSections.sizes ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
          </button>
          {openSections.sizes && (
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size) => {
                const isActive = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`w-8 h-8 rounded text-[11px] font-mono flex items-center justify-center border transition-all ${
                      isActive
                        ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 font-semibold"
                        : "border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-800 dark:hover:border-slate-400"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Section 6: Rating */}
        <div>
          <button
            onClick={() => toggleSection("rating")}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200 mb-3"
          >
            <span>Minimum Rating</span>
            {openSections.rating ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
          </button>
          {openSections.rating && (
            <div className="flex flex-col space-y-2 mt-2">
              <label className="flex items-center text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer py-0.5">
                <input
                  type="radio"
                  name="rating"
                  checked={selectedRating === 0}
                  onChange={() => setSelectedRating(0)}
                  className="mr-2.5 text-amber-500 focus:ring-amber-500 accent-amber-500 w-3.5 h-3.5"
                />
                <span>Show All Ratings</span>
              </label>
              {ratings.map((rate) => (
                <label
                  key={rate.value}
                  className="flex items-center text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer py-0.5"
                >
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === rate.value}
                    onChange={() => setSelectedRating(rate.value)}
                    className="mr-2.5 text-amber-500 focus:ring-amber-500 accent-amber-500 w-3.5 h-3.5"
                  />
                  <span>{rate.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
