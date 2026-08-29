import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ShopProvider } from "./context/ShopContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </ThemeProvider>
  </BrowserRouter>
);
