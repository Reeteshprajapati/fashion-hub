import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import Loader from "./components/Loader";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";

import SearchBar from "./components/SearchBar";
import { AnimatePresence } from "framer-motion";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-linen dark:bg-slate-950 text-brand-espresso dark:text-brand-linen transition-colors duration-500 overflow-x-hidden relative">


      {/* Preloader Animation Screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader finishLoading={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Sticky Global Header Navbar */}
          <Navbar onSearchOpen={() => setIsSearchOpen(true)} />

          {/* Full-screen live matching search overlay */}
          <AnimatePresence>
            {isSearchOpen && (
              <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
            )}
          </AnimatePresence>

          {/* Core Routes mapping actual pages */}
          <main className="min-h-[80vh]">
            <AnimatePresence mode="wait">
              <AppRoutes location={location} key={location.pathname} />
            </AnimatePresence>
          </main>

          {/* Structured detailed footer */}
          <Footer />

          {/* Luxury Global Floating WhatsApp Support */}
          <WhatsAppFloatingButton />
        </>
      )}
    </div>
  );
}

export default App;
