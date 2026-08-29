import React, { createContext, useContext, useState, useEffect } from "react";
import { products } from "../data/products";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart) return [];
      const parsed = JSON.parse(savedCart);
      // Filter out any stale item whose product is no longer present in the active catalog!
      return parsed.filter(item => item && item.product && products.some(p => p.id === item.product.id));
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWish = localStorage.getItem("wishlist");
      if (!savedWish) return [];
      const parsed = JSON.parse(savedWish);
      // Filter out any stale product no longer in active catalog
      return parsed.filter(item => item && products.some(p => p.id === item.id));
    } catch (e) {
      return [];
    }
  });

  // Persist Cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Helper to generate a unique key for cart items to differentiate by size & color
  const getCartItemKey = (productId, size, colorName) => {
    return `${productId}-${size}-${colorName.replace(/\s+/g, "").toLowerCase()}`;
  };

  // Add to Cart
  const addToCart = (product, quantity = 1, size, color) => {
    // Default size and color selection if none provided
    const selectedSize = size || (product.sizes && product.sizes[0]) || "Free Size";
    const selectedColor = color || (product.colors && product.colors[0]) || { name: "Default", hex: "#000" };

    const key = getCartItemKey(product.id, selectedSize, selectedColor.name);

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.key === key);

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            key,
            id: product.id,
            product,
            quantity,
            selectedSize,
            selectedColor
          }
        ];
      }
    });
  };

  // Remove from Cart
  const removeFromCart = (key) => {
    setCart((prevCart) => prevCart.filter((item) => item.key !== key));
  };

  // Update Item Quantity
  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) {
      removeFromCart(key);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  // Toggle Wishlist
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyInWishlist = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyInWishlist) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  // Is product in wishlist?
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Cart Metrics
  const cartCount = cart.reduce((acc, item) => acc + (item?.quantity || 0), 0);

  const cartSubtotal = cart.reduce((acc, item) => {
    if (!item?.product?.price) return acc;
    const finalPrice = item.product.price * (1 - (item.product.discount || 0) / 100);
    return acc + finalPrice * (item?.quantity || 1);
  }, 0);

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartSubtotal,
        clearCart
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
