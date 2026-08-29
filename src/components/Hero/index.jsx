import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { gsap } from "gsap";
import { motion } from "framer-motion";

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const backgroundRef = useRef(null);

  // GSAP animations on component mount
  useEffect(() => {
    // Elegant split-text reveal for title
    const ctx = gsap.context(() => {
      // Background Video Parallax scale-in
      gsap.fromTo(
        backgroundRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1.0, opacity: 0.8, duration: 2.2, ease: "power4.out" }
      );

      // Title characters slide up
      const chars = titleRef.current?.querySelectorAll(".char-span");
      if (chars && chars.length > 0) {
        gsap.fromTo(
          chars,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            stagger: 0.05,
            duration: 1.4,
            ease: "power4.out",
            delay: 0.4,
          }
        );
      }

      // Tagline fade up
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 0.8, duration: 1.2, ease: "power3.out", delay: 1.2 }
      );

      // CTA Buttons scale & slide-in
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.9, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "back.out(1.7)", delay: 1.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Title string split helper
  const titleText = "ELEGANCE IN EVERY THREAD";
  const titleWords = titleText.split(" ");

  return (
    <div
      ref={heroRef}
      className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-slate-50 text-slate-900 font-light select-none"
    >
      {/* Background Video with Light Tint Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={backgroundRef}
          autoPlay
          loop
          muted
          playsInline
          poster="/hero_fashion_poster.png"
          className="w-full h-full object-cover opacity-80 select-none pointer-events-none"
        >
          <source src="https://player.vimeo.com/external/435674703.sd.mp4?s=7f5df5f1b135ad0c8227b68638b975877c449c25&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/50 to-slate-50/80 md:bg-gradient-to-r md:from-slate-50 md:via-slate-50/60 md:to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-5xl mx-auto px-6 text-center z-20 flex flex-col items-center">
        {/* Sub-header tagline */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 0.8, letterSpacing: "0.45em" }}
          transition={{ duration: 1.5 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-slate-500 font-semibold mb-6 font-mono"
        >
          MAISON LUXE COUTURE
        </motion.p>

        {/* Title text split into words & characters for stagger effect */}
        <h1
          ref={titleRef}
          className="text-3xl md:text-6xl lg:text-7xl font-extralight tracking-widest leading-[1.15] mb-8 uppercase flex flex-wrap justify-center overflow-hidden text-slate-900"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {titleWords.map((word, wIdx) => (
            <span key={wIdx} className="inline-block whitespace-nowrap mx-3 overflow-hidden py-1">
              {word.split("").map((char, cIdx) => (
                <span key={cIdx} className="char-span inline-block transform origin-bottom">
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Short luxury tagline */}
        <p
          ref={textRef}
          className="max-w-xl text-sm md:text-base text-slate-700 tracking-wide leading-relaxed font-light mb-12 opacity-90"
        >
          Explore structured wool overcoats, fluid organic silk draped dresses, and limited-edition designer kimonos hand-selected for the discerning wardrobe.
        </p>

        {/* Call to Actions */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-5">
          <Link
            to="/shop"
            className="group px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 clickable"
          >
            <span>Explore Atelier</span>
            <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <Link
            to="/shop?category=Premium"
            className="px-8 py-4 border border-slate-350 hover:border-slate-900 text-slate-800 hover:text-slate-950 font-semibold text-xs uppercase tracking-[0.2em] rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-sm transition-all hover:scale-105 clickable"
          >
            Limited Edition
          </Link>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60 animate-bounce">
        <span className="text-[9px] uppercase tracking-[0.3em] font-mono mb-2 text-slate-600">Scroll Down</span>
        <div className="w-[1px] h-8 bg-slate-400" />
      </div>
    </div>
  );
};

export default Hero;
