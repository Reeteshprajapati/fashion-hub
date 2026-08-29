import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import ProductCard from "../../components/ProductCard";
import QuickViewModal from "../../components/Modal";
import PageWrapper from "../../animations/PageWrapper";
import { FiShoppingBag, FiHeart, FiChevronDown, FiChevronUp, FiShield, FiTruck, FiCornerUpLeft, FiX } from "react-icons/fi";
import { FaStar, FaQuoteLeft, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ProductDetails = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

  const paramVal = id || slug;

  // Find product by id or slug
  const product = products.find((p) => {
    const productSlug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return p.id.toString() === paramVal || productSlug === paramVal;
  });

  // State handlers
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState("fabric");
  const [successMsg, setSuccessMsg] = useState("");

  // Related Products Quick View
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Quick Order Form Modal State
  const [isQuickOrderOpen, setIsQuickOrderOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [orderSubmitting, setOrderSubmitting] = useState(false);

  // Sync state when product ID parameters change
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedSize(product.sizes[0] || "Free Size");
      setSelectedColor(product.colors[0] || null);
      setQuantity(1);
      setSuccessMsg("");
      window.scrollTo(0, 0);
    }
  }, [product, id]);

  if (!product) {
    return (
      <PageWrapper>
        <div className="pt-32 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-md p-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl shadow-xl flex flex-col items-center"
          >
            <div className="text-4xl md:text-5xl font-extralight text-amber-500 font-serif mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
              404
            </div>
            <h2 className="text-sm uppercase tracking-widest font-semibold text-slate-800 dark:text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
              Collection Piece Not Found
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-8">
              We regret to inform you that the luxury designer apparel piece you are seeking does not exist in our atelier registry or has been retired.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <Link
                to="/shop"
                className="flex-grow text-center py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md clickable"
              >
                Continue Shopping
              </Link>
              <Link
                to="/"
                className="flex-grow text-center py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-700 dark:text-slate-200 font-semibold text-xs uppercase tracking-widest rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-900 clickable"
              >
                Return Home
              </Link>
            </div>
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  const favorited = isInWishlist(product.id);
  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  // Curate Related Products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setSuccessMsg("ADDED TO BAG");
    setTimeout(() => {
      setSuccessMsg("");
    }, 2000);
  };

  const handleQuickView = (p) => {
    setSelectedProduct(p);
    setIsModalOpen(true);
  };

  const getWhatsAppNumber = () => "917240954668";

  const handleBuyNow = () => {
    const brandName = product.brand || "FashionHub";
    const selectedSizeText = selectedSize ? `Size: *${selectedSize}*` : "";
    const selectedColorText = selectedColor?.name ? `Color: *${selectedColor.name}*` : "";
    const qtyText = `Qty: *${quantity}*`;
    const priceText = `Total Price: *${(finalPrice * quantity).toFixed(2)} USD*`;

    const message = `Hello! I would like to Buy Now:
    
*PRODUCT DETAILS*
- Product: *${product.name}*
- Brand: *${brandName}*
- ${selectedSizeText}
- ${selectedColorText}
- ${qtyText}
- ${priceText}

Please let me know the payment and delivery options. Thank you!`;

    const url = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hello! I'm interested in purchasing this product. Please provide more details:
    
- Product: *${product.name}*
- Category: *${product.category || ""}*
- Price: *${finalPrice.toFixed(2)} USD*`;

    const url = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const handleQuickOrderSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress || !customerCity) {
      alert("Please fill in all the details to place your quick order.");
      return;
    }
    
    setOrderSubmitting(true);
    
    const brandName = product.brand || "FashionHub";
    const selectedSizeText = selectedSize ? `Size: *${selectedSize}*` : "";
    const selectedColorText = selectedColor?.name ? `Color: *${selectedColor.name}*` : "";
    const qtyText = `Qty: *${quantity}*`;
    const priceText = `Total Price: *${(finalPrice * quantity).toFixed(2)} USD*`;

    const message = `Hello! I would like to place a Quick Order!
    
*CUSTOMER SHIPPING DETAILS*
- Name: *${customerName}*
- Phone: *${customerPhone}*
- Address: *${customerAddress}*
- City: *${customerCity}*

*ORDER DETAILS*
- Product: *${product.name}*
- Brand: *${brandName}*
- ${selectedSizeText}
- ${selectedColorText}
- ${qtyText}
- ${priceText}

Please confirm this order. Thank you!`;

    setTimeout(() => {
      setOrderSubmitting(false);
      setIsQuickOrderOpen(false);
      const url = `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }, 800);
  };

  const toggleAccordion = (section) => {
    setActiveAccordion((prev) => (prev === section ? "" : section));
  };

  return (
    <PageWrapper>
      <div className="pt-28 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest text-slate-500 hover:text-amber-500 transition-colors mb-8"
          >
            <FiCornerUpLeft className="w-4 h-4" />
            <span>Return</span>
          </button>

          {/* Double Column product display */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Left Column: Image previews */}
            <div className="flex flex-col">
              <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden bg-white border border-slate-200/50 shadow-sm relative group overflow-hidden">
                {/* Floating Front/Back view indicators */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm text-slate-800 font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-full z-10 shadow-md border border-slate-200/40">
                  {activeImageIndex === 0 ? "Front View Image" : "Back View Image"}
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    src={product.images[activeImageIndex]}
                    alt={`${product.name} - ${activeImageIndex === 0 ? "Front View" : "Back View"}`}
                    className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-700 ease-out cursor-zoom-in"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnail Gallery Row */}
              {product.images.length > 1 && (
                <div className="flex space-x-3.5 mt-5 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all shadow-sm ${
                        activeImageIndex === idx ? "border-amber-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`thumbnail ${idx}`} className="w-full h-full object-cover object-top" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Specifications & actions */}
            <div className="flex flex-col justify-between font-light">
              <div>
                {/* Brand, Category & Stars */}
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-xs tracking-[0.2em] font-semibold text-slate-450 dark:text-slate-505 uppercase">
                      {product.brand}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <span className="text-[10px] tracking-widest font-semibold text-amber-500 uppercase">
                      {product.category} &bull; {product.subCategory}
                    </span>
                  </div>
                  <div className="flex items-center text-amber-500 text-sm">
                    <FaStar className="w-4 h-4 mr-1.5" />
                    <span className="font-mono text-sm font-semibold">{product.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Product Name */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extralight text-slate-900 dark:text-white tracking-widest leading-[1.2] uppercase mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                  {product.name}
                </h1>

                {/* Pricing Block */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-2xl font-semibold text-slate-900 dark:text-slate-100 font-mono">
                    ${finalPrice.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-base line-through text-slate-400 font-mono">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-xs font-mono uppercase bg-amber-500/10 text-amber-500 px-3 py-1 rounded">
                        Save {product.discount}%
                      </span>
                    </>
                  )}
                </div>

                {/* Detailed Description */}
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 block mb-2.5">
                      Selected Atelier Color: {selectedColor?.name}
                    </span>
                    <div className="flex space-x-3.5">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color)}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
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
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 dark:text-slate-500 block mb-2.5">
                      Atelier Sizing Canvas: {selectedSize}
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[36px] h-9 px-3.5 border rounded-lg text-xs font-mono flex items-center justify-center transition-all ${
                            selectedSize === size
                              ? "bg-slate-900 border-slate-900 text-white dark:bg-white dark:border-white dark:text-slate-900 scale-105 shadow-sm font-semibold"
                              : "border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-800 dark:hover:border-slate-400"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity picker & checkout buttons */}
                <div className="flex items-center space-x-6 mb-8 pt-2">
                  <div className="flex items-center">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mr-3">
                      Qty:
                    </span>
                    <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-mono font-semibold">{quantity}</span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="px-3 py-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Checkout & WhatsApp conversion flow */}
              <div className="space-y-4 pt-6 border-t border-slate-200/50 dark:border-slate-800/40">
                {/* Buy Now Button (Direct WhatsApp) */}
                <div className="flex space-x-4">
                  <button
                    onClick={handleBuyNow}
                    className="flex-grow py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5 clickable"
                  >
                    <FaWhatsapp className="w-4.5 h-4.5" />
                    <span>Buy Now via WhatsApp</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`px-5 rounded-xl border flex items-center justify-center transition-all clickable ${
                      favorited
                        ? "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/30"
                        : "border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500"
                    }`}
                    title={favorited ? "Saved in Wishlist" : "Save to Wishlist"}
                  >
                    <FiHeart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
                  </button>
                </div>

                {/* WhatsApp Inquiry & Quick Order Form Row */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleWhatsAppInquiry}
                    className="py-3 bg-white dark:bg-slate-900 border border-slate-200 hover:border-amber-500 dark:border-slate-800 dark:hover:border-amber-500 text-slate-700 dark:text-slate-200 font-semibold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 clickable shadow-sm"
                  >
                    <FaWhatsapp className="w-4.5 h-4.5 text-emerald-500" />
                    <span>WhatsApp Inquiry</span>
                  </button>

                  <button
                    onClick={() => setIsQuickOrderOpen(true)}
                    className="py-3 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-50 text-white dark:text-slate-900 font-semibold text-[10px] uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2 clickable shadow-md"
                  >
                    <FiShoppingBag className="w-4 h-4" />
                    <span>Quick Order Form</span>
                  </button>
                </div>

                {/* Small Add to Bag fallback link for compatibility */}
                <div className="text-center">
                  <button
                    onClick={handleAddToCart}
                    className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-amber-500 transition-colors underline decoration-dotted underline-offset-4 animate-pulse"
                  >
                    {successMsg ? successMsg : "Or save quietly to Shopping Bag"}
                  </button>
                </div>

                {/* Back to Shop Navigation Trigger */}
                <div className="pt-2 flex justify-center">
                  <Link
                    to="/shop"
                    className="flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold text-slate-500 hover:text-amber-500 transition-colors py-2.5 px-4 border border-slate-200/50 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 clickable shadow-sm w-full justify-center"
                  >
                    <FiCornerUpLeft className="w-4 h-4" />
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>

              {/* Accordions */}
              <div className="mt-12 flex flex-col border border-slate-200/50 dark:border-slate-800/40 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900/50">
                {/* Accordion 1: Fabric details */}
                <div className="border-b border-slate-200/40 dark:border-slate-800/40">
                  <button
                    onClick={() => toggleAccordion("fabric")}
                    className="flex items-center justify-between w-full p-4 text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200"
                  >
                    <span>Craftsmanship & Fabric</span>
                    {activeAccordion === "fabric" ? <FiChevronUp className="w-4 h-4 text-amber-500" /> : <FiChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {activeAccordion === "fabric" && (
                    <div className="p-4 pt-0 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light pl-6">
                      <ul className="list-disc space-y-1">
                        {product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Accordion 2: Delivery & Packaging */}
                <div className="border-b border-slate-200/40 dark:border-slate-800/40">
                  <button
                    onClick={() => toggleAccordion("packaging")}
                    className="flex items-center justify-between w-full p-4 text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200"
                  >
                    <span>Luxury Pack Promise</span>
                    {activeAccordion === "packaging" ? <FiChevronUp className="w-4 h-4 text-amber-500" /> : <FiChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {activeAccordion === "packaging" && (
                    <div className="p-4 pt-0 text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex items-start space-x-3.5 pl-6">
                      <FiShield className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p>
                        Delivered in our signature cedar preservation box, wrapped gently in reusable unbleached cotton linen dust jackets. Includes complimentary leather-scented conditioning spray.
                      </p>
                    </div>
                  )}
                </div>

                {/* Accordion 3: Returns */}
                <div>
                  <button
                    onClick={() => toggleAccordion("returns")}
                    className="flex items-center justify-between w-full p-4 text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-200"
                  >
                    <span>Premium Shipping & Returns</span>
                    {activeAccordion === "returns" ? <FiChevronUp className="w-4 h-4 text-amber-500" /> : <FiChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {activeAccordion === "returns" && (
                    <div className="p-4 pt-0 text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex items-start space-x-3.5 pl-6">
                      <FiTruck className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                      <p>
                        Complimentary premium courier priority shipment. Return request pickup straight from your suite within 30 days of standard receipt. Fully insured.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-16 mb-20">
            <h2 className="text-xl font-light tracking-widest uppercase mb-10 flex items-center" style={{ fontFamily: "'Cinzel', serif" }}>
              <span>Patron Reviews</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 pl-3 font-mono">
                ({product.reviews.length})
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {product.reviews.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-850 p-6 rounded-xl shadow-sm flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-slate-800 dark:text-white">
                        {rev.author}
                      </h4>
                      <div className="flex items-center text-amber-500 text-[11px]">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-3 h-3 ${i < rev.rating ? "text-amber-500" : "text-slate-200 dark:text-slate-800"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light italic">
                      "{rev.comment}"
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono self-end">
                    {rev.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-slate-200/50 dark:border-slate-800/40 pt-16">
              <div className="flex justify-between items-end mb-10">
                <div>
                  <p className="text-[10px] tracking-[0.2em] font-semibold text-amber-500 uppercase font-mono mb-2">
                    Complete the Atelier
                  </p>
                  <h2 className="text-xl md:text-2xl font-light tracking-widest text-slate-900 dark:text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                    Related Products
                  </h2>
                </div>
                <Link
                  to="/shop"
                  className="text-xs uppercase tracking-widest font-semibold hover:text-amber-500 text-slate-500 transition-colors flex items-center space-x-1.5"
                >
                  <span>Explore All</span>
                  <FiCornerUpLeft className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={handleQuickView} />
                ))}
              </div>
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

      {/* Premium Sliding Quick Order Modal */}
      <AnimatePresence>
        {isQuickOrderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuickOrderOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative bg-white border border-slate-200/50 rounded-2xl w-full max-w-md p-8 shadow-2xl z-10 font-light text-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsQuickOrderOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 hover:scale-110 transition-all p-2 rounded-full border border-slate-250 bg-white/70 backdrop-blur-sm"
                aria-label="Close Order Form"
              >
                <FiX className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-bounce">
                  <FaWhatsapp className="w-6 h-6" />
                </div>
                <h3 className="text-base uppercase tracking-widest font-semibold text-slate-900" style={{ fontFamily: "'Cinzel', serif" }}>
                  Quick Order Form
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Fill in your details below. We will instantly format your luxury receipt and open WhatsApp to finalize your delivery!
                </p>
              </div>

              <form onSubmit={handleQuickOrderSubmit} className="space-y-4">
                <div>
                  <label className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Alexander McQueen"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all placeholder:text-slate-350 text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 block mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all placeholder:text-slate-350 text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 block mb-1">
                    Complete Shipping Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Apartment, suite, street name, pincode, etc."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all placeholder:text-slate-350 text-slate-900 resize-none"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 block mb-1">
                    City / Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="e.g. New Delhi, India"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:ring-1 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all placeholder:text-slate-350 text-slate-900"
                  />
                </div>

                <div className="bg-slate-50 border border-slate-200/40 p-4 rounded-xl text-center space-y-1">
                  <div className="text-[9px] uppercase tracking-widest font-semibold text-slate-400">Order Summary</div>
                  <div className="text-base font-mono font-semibold text-slate-900">
                    ${(finalPrice * quantity).toFixed(2)}
                  </div>
                  <div className="text-[9px] text-slate-500 leading-normal">
                    {quantity}x {product.name} ({selectedSize} / {selectedColor?.name || "Standard"})
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={orderSubmitting}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5 clickable"
                >
                  {orderSubmitting ? (
                    <span className="animate-pulse">Formatting invoice...</span>
                  ) : (
                    <>
                      <FaWhatsapp className="w-4 h-4" />
                      <span>Confirm & Send to WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default ProductDetails;
