import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loader = ({ finishLoading }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            finishLoading();
          }, 600); // Small pause at 100%
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [finishLoading]);

  // Framer Motion text stagger
  const letters = "FASHIONHUB".split("");

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 text-slate-800 font-sans"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      {/* Elegantly styled branding container */}
      <div className="flex flex-col items-center max-w-md w-full px-6">
        {/* Brand Name with letter animation */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="flex space-x-1"
        >
          {letters.map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-widest text-slate-800"
              style={{ fontFamily: "'Cinzel', serif, system-ui" }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xs uppercase tracking-[0.4em] text-slate-500 font-light mt-3 mb-8"
        >
          HAUTE COUTURE
        </motion.p>

        {/* Golden Progress Bar */}
        <div className="w-48 h-[1px] bg-slate-200 relative overflow-hidden rounded">
          <motion.div
            className="absolute left-0 top-0 h-full bg-slate-500"
            initial={{ width: "0%" }}
            animate={{ width: `${percent}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          className="text-slate-500 font-mono text-[10px] tracking-widest mt-2"
        >
          {percent}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Loader;
