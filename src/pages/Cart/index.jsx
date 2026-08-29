import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShop } from "../../context/ShopContext";
import PageWrapper from "../../animations/PageWrapper";
import { FiTrash2, FiShoppingBag, FiArrowRight, FiShield, FiTag, FiGift, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartSubtotal, clearCart } = useShop();
  const navigate = useNavigate();

  // Promo Code States
  const [promoCode, setPromoCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percentage
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  // Checkout Success Simulation Overlay
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0); // 0: Idle, 1: Packaging, 2: Done

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    setPromoSuccess("");

    if (promoCode.trim().toUpperCase() === "LUXE10") {
      setAppliedDiscount(10);
      setPromoSuccess("PROMO 'LUXE10' APPLIED: 10% OFF SUB-TOTAL");
    } else if (promoCode.trim().toUpperCase() === "ATELIER20") {
      setAppliedDiscount(20);
      setPromoSuccess("PROMO 'ATELIER20' APPLIED: 20% OFF SUB-TOTAL");
    } else {
      setPromoError("Invalid luxury promo code.");
      setAppliedDiscount(0);
    }
  };

  const calculateDiscountValue = () => {
    return cartSubtotal * (appliedDiscount / 100);
  };

  const calculateTotal = () => {
    return cartSubtotal - calculateDiscountValue();
  };

  const handleProceedCheckout = () => {
    setIsCheckingOut(true);
    setCheckoutStep(1);

    // Step 1: Packaging simulation
    setTimeout(() => {
      setCheckoutStep(2);
    }, 2500);
  };

  const handleFinishCheckout = () => {
    clearCart();
    setIsCheckingOut(false);
    setCheckoutStep(0);
    navigate("/");
  };

  return (
    <PageWrapper>
      <div className="pt-28 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page Header */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extralight tracking-widest text-slate-900 dark:text-white" style={{ fontFamily: "'Cinzel', serif" }}>
              MY SHOPPING BAG
            </h1>
            <p className="text-xs text-slate-500 mt-2 font-light max-w-xl">
              Meticulously selected luxury apparel. Review your sizing parameters, insert private promo credits, or proceed to priority checkout.
            </p>
          </div>

          {cart.length > 0 ? (
            /* Double Column Layout */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 font-light">
              {/* Left Column: Itemized list */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => {
                  const itemPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
                  return (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6"
                    >
                      {/* Product Thumbnail & Core details */}
                      <div className="flex items-center w-full sm:w-auto">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-16 h-20 object-cover object-top rounded-lg bg-slate-100 dark:bg-slate-950 border"
                        />
                        <div className="ml-5">
                          <span className="text-[10px] tracking-wider font-semibold text-slate-400 dark:text-slate-500 uppercase">
                            {item.product.brand}
                          </span>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="block text-sm font-light text-slate-800 dark:text-slate-100 hover:text-amber-500 transition-colors line-clamp-1 mb-1"
                          >
                            {item.product.name}
                          </Link>
                          {/* Size & Color Parameters */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] text-slate-500">
                            <span className="font-mono bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded">
                              Size: {item.selectedSize}
                            </span>
                            <span className="flex items-center space-x-1.5 font-mono bg-slate-100 dark:bg-slate-800/60 px-2 py-0.5 rounded">
                              <span>Color:</span>
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              <span>{item.selectedColor.name}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Controls & Prices */}
                      <div className="flex items-center justify-between w-full sm:w-auto gap-8 border-t sm:border-t-0 pt-4 sm:pt-0">
                        {/* Quantity picker */}
                        <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            className="px-2.5 py-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-mono font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            className="px-2.5 py-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                          >
                            +
                          </button>
                        </div>

                        {/* Prices */}
                        <div className="text-right">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 font-mono">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              (${itemPrice.toFixed(2)} each)
                            </p>
                          )}
                        </div>

                        {/* Deletion Button */}
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-slate-400 hover:text-rose-500 transition-colors p-2"
                          aria-label="Remove item"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Pricing Summary Card */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-2xl p-6 shadow-sm sticky top-28 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-slate-800 dark:text-white pb-3 border-b border-slate-150 dark:border-slate-800 mb-6 flex items-center">
                      <FiShield className="w-4 h-4 mr-2 text-amber-500" />
                      <span>Order Summary</span>
                    </h3>

                    {/* Pricing rows */}
                    <div className="space-y-4 mb-6 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>Bag Subtotal</span>
                        <span className="font-mono text-slate-800 dark:text-white font-semibold">
                          ${cartSubtotal.toFixed(2)}
                        </span>
                      </div>

                      {appliedDiscount > 0 && (
                        <div className="flex justify-between text-amber-500 font-mono">
                          <span>Promo Discount ({appliedDiscount}%)</span>
                          <span>-${calculateDiscountValue().toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Luxury Priority Shipping</span>
                        <span className="text-amber-500 font-semibold uppercase tracking-widest font-mono text-[10px]">
                          COMPLIMENTARY
                        </span>
                      </div>

                      <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-4" />

                      <div className="flex justify-between text-slate-800 dark:text-white">
                        <span className="text-sm font-semibold">Total Invoice</span>
                        <span className="text-base font-semibold font-mono text-amber-500">
                          ${calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Promo Code Input Panel */}
                    <form onSubmit={handleApplyPromo} className="mb-6 pt-4 border-t border-slate-100 dark:border-slate-850">
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-slate-450 block mb-2">
                        Promo Voucher (e.g. LUXE10, ATELIER20)
                      </span>
                      <div className="flex space-x-2">
                        <div className="relative flex-grow flex items-center">
                          <FiTag className="absolute left-3 text-slate-400 w-3.5 h-3.5" />
                          <input
                            type="text"
                            placeholder="Insert Coupon Code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-xs pl-9 pr-3 py-2 rounded-lg w-full text-slate-700 dark:text-slate-350 focus:outline-none focus:border-amber-500 font-light"
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:text-amber-500 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-950 transition-colors clickable"
                        >
                          Apply
                        </button>
                      </div>
                      {/* Success & Error alerts */}
                      {promoSuccess && (
                        <p className="text-[9px] text-amber-500 font-mono tracking-widest mt-2">
                          {promoSuccess}
                        </p>
                      )}
                      {promoError && (
                        <p className="text-[9px] text-rose-500 font-mono tracking-widest mt-2">
                          {promoError}
                        </p>
                      )}
                    </form>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleProceedCheckout}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2.5 clickable"
                  >
                    <span>Proceed to Checkout</span>
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-24 bg-white border border-slate-200/50 rounded-2xl p-8 flex flex-col items-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mb-6 border border-slate-200/20">
                <FiShoppingBag className="w-5 h-5 animate-bounce" />
              </div>
              <h3 className="text-lg font-light text-slate-900 mb-2 uppercase tracking-wider">
                Shopping Bag is Empty
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mb-8 font-light leading-relaxed">
                Your luxury cart is empty. Pick premium apparel from our categories and assemble your perfect wardrobe.
              </p>
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-slate-900 text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-slate-800 transition-all shadow-md hover:scale-105 flex items-center space-x-2 clickable"
              >
                <span>Explore Shop Canvas</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Luxury Checkout Simulation Overlay */}
      <AnimatePresence>
        {isCheckingOut && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />

            {/* Simulated Checkout Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white border border-slate-200/60 text-slate-800 rounded-2xl w-full max-w-md p-8 shadow-2xl z-10 font-light flex flex-col items-center text-center"
            >
              {checkoutStep === 1 ? (
                /* Checkout state 1: Preparing box */
                <div className="flex flex-col items-center py-6">
                  <FiGift className="w-16 h-16 text-slate-500 mb-6 animate-pulse" />
                  <h3 className="text-lg uppercase tracking-widest font-light mb-2 text-slate-900">
                    Preparing Luxury Box
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">
                    Meticulously wrapping your custom selections in unbleached linen dust sleeves and our cedar wood presentation box...
                  </p>
                  <div className="w-12 h-12 border-t-2 border-slate-500 border-r-2 border-slate-200 rounded-full animate-spin" />
                </div>
              ) : (
                /* Checkout state 2: Done */
                <div className="flex flex-col items-center py-6">
                  <span className="text-5xl text-slate-500 mb-6 animate-bounce">𐏔</span>
                  <h3 className="text-lg uppercase tracking-widest font-light mb-2 text-slate-900">
                    Order Meticulously Placed
                  </h3>
                  <p className="text-xs text-slate-550 max-w-xs leading-relaxed mb-8">
                    Your luxury package is registered. An email dispatch verification has been routed to your inbox. Enjoy the slow fashion couture experience!
                  </p>
                  <button
                    onClick={handleFinishCheckout}
                    className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-all shadow-md clickable"
                  >
                    Return to Atelier
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Cart;
