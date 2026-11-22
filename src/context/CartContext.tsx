"use client";

import {
  createContext,
  useContext,
  useState,
    useEffect,
  type Dispatch,
  type SetStateAction,
  
} 

from "react";
import { products as initialProducts } from "@/data/products";
type Product = {
  id: number;
    stock?: number;
  name: string;
  slug: string;
  description: string;
  specifications: {
    material: string;
    fit: string;
    care: string;
    productType: string;
  };
  category: string;
  price: string;
  image: string;
  images: string[];
  tag: string;
};
type Address = {
  id: number;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault: boolean;
};
type CartContextType = {
    products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
    addresses: Address[];
  setAddresses: Dispatch<SetStateAction<Address[]>>;
  cart: any[];
  searchQuery: string;
setSearchQuery: Dispatch<SetStateAction<string>>;
  setCart: Dispatch<SetStateAction<any[]>>;
  orders: any[];
setOrders: Dispatch<SetStateAction<any[]>>;
  wishlist: any[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
setIsCheckoutOpen: Dispatch<SetStateAction<boolean>>;
setIsCartOpen: Dispatch<SetStateAction<boolean>>;
  setWishlist: Dispatch<SetStateAction<any[]>>;
  recentlyViewed: any[];
setRecentlyViewed: Dispatch<SetStateAction<any[]>>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  useEffect(() => {
  const savedOrders = localStorage.getItem("fashion-cart-orders");

  if (savedOrders) {
    setOrders(JSON.parse(savedOrders));
  }

  setOrdersLoaded(true);
}, []);

useEffect(() => {
  if (!ordersLoaded) return;

  localStorage.setItem("fashion-cart-orders", JSON.stringify(orders));
}, [orders, ordersLoaded]);

useEffect(() => {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === "fashion-cart-orders" && event.newValue) {
      try {
        setOrders(JSON.parse(event.newValue));
      } catch (error) {
        console.error("Failed to sync orders:", error);
      }
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}, []);
 
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [productsLoaded, setProductsLoaded] = useState(false);
  useEffect(() => {
  const savedProducts = localStorage.getItem("fashion-cart-products");

  if (savedProducts) {
    setProducts(JSON.parse(savedProducts));
  }

  setProductsLoaded(true);
}, []);
useEffect(() => {
  if (!productsLoaded) return;

  localStorage.setItem(
    "fashion-cart-products",
    JSON.stringify(products)
  );
}, [products, productsLoaded]);
useEffect(() => {
  const handleProductStorage = (event: StorageEvent) => {
    if (event.key === "fashion-cart-products" && event.newValue) {
      try {
        setProducts(JSON.parse(event.newValue));
      } catch (error) {
        console.error("Failed to sync products:", error);
      }
    }
  };

  window.addEventListener("storage", handleProductStorage);

  return () => {
    window.removeEventListener("storage", handleProductStorage);
  };
}, []);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <CartContext.Provider
      value={{
        products,
setProducts,
          addresses,
  setAddresses,
  cart,
  recentlyViewed,
  searchQuery,
setSearchQuery,
setRecentlyViewed,
  setCart,
  orders,
setOrders,
  wishlist,
  setWishlist,
  isCartOpen,
  setIsCartOpen,
  isCheckoutOpen,
setIsCheckoutOpen,
}}

    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}