import React, { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppFloatingButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleInquiry = () => {
    const defaultMsg = "Hello, I'm interested in purchasing this product. Please provide more details.";
    const url = `https://wa.me/917240954668?text=${encodeURIComponent(defaultMsg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end font-light">
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mr-3.5 px-4.5 py-2.5 bg-white/95 dark:bg-slate-900/95 border border-slate-200/50 dark:border-slate-800/80 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md flex items-center space-x-2 text-[10px] uppercase tracking-widest font-semibold text-slate-800 dark:text-slate-200 pointer-events-none select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Chat with an Atelier Stylist</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleInquiry}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 shadow-[0_4px_25px_rgba(0,82,255,0.12)] flex items-center justify-center relative group overflow-hidden clickable focus:outline-none transition-shadow duration-300"
        style={{ boxShadow: "0 0 15px rgba(0, 82, 255, 0.08)" }}
        title="WhatsApp Live Support"
      >
        {/* Glow pulsing ring (WhatsApp Green + Royal Blue blend) */}
        <span className="absolute inset-0 rounded-full border border-emerald-500/30 group-hover:border-emerald-500 group-hover:scale-105 transition-all duration-500 animate-ping opacity-60 pointer-events-none" />
        <span className="absolute inset-0 rounded-full border border-slate-500/10 group-hover:border-amber-500 group-hover:scale-110 transition-all duration-500 pointer-events-none" />

        {/* WhatsApp Brand Icon */}
        <FaWhatsapp className="w-7 h-7 text-emerald-500 group-hover:text-emerald-600 transition-colors duration-300 z-10" />

        {/* Gloss overlay */}
        <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.button>
    </div>
  );
};

export default WhatsAppFloatingButton;
