"use client";
import Link from "next/link";
import { products } from "@/data/products";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Checkout from "@/components/Checkout";
const categories = [
  {
    name: "T-SHIRTS",
    subtitle: "Everyday essentials",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=85",
  },
  {
    name: "SHIRTS",
    subtitle: "Effortless sophistication",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=900&q=85",
  },
  {
    name: "JACKETS",
    subtitle: "Make a statement",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=900&q=85",
  },
  {
    name: "FOOTWEAR",
    subtitle: "Step up your style",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
  },
];
export default function Home() {
  const {
  products,
  cart,
  setCart,
  wishlist,
  setWishlist,
  isCartOpen,
  setIsCartOpen,
  recentlyViewed,
  searchQuery,
  setSearchQuery,
} = useCart();
  const toggleWishlist = (product: any) => {
  setWishlist((prevWishlist) =>
    prevWishlist.some((item) => item.slug === product.slug)
      ? prevWishlist.filter((item) => item.slug !== product.slug)
      : [...prevWishlist, product]
  );
};
 
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  // Checkout Form State
const [customerName, setCustomerName] = useState("");
const [customerEmail, setCustomerEmail] = useState("");
const [customerPhone, setCustomerPhone] = useState("");
const [streetAddress, setStreetAddress] = useState("");
const [landmark, setLandmark] = useState("");
const [city, setCity] = useState("");
const [state, setState] = useState("");
const [pinCode, setPinCode] = useState("");
const [formErrors, setFormErrors] = useState<string[]>([]);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const cartSubtotal = cart.reduce((total, item) => {
  const price = Number(
    String(item.price).replace(/[^\d.]/g, "")
  ) || 0;

  return total + price * (item.quantity || 1);
}, 0);
const validateCheckout = () => {
  const errors: string[] = [];

  if (!customerName.trim()) {
    errors.push("Full name is required.");
  }

  if (!customerEmail.trim()) {
    errors.push("Email address is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    errors.push("Please enter a valid email address.");
  }

  if (!customerPhone.trim()) {
    errors.push("Phone number is required.");
  } else if (!/^[6-9]\d{9}$/.test(customerPhone.trim())) {
    errors.push("Please enter a valid 10-digit Indian mobile number.");
  }

  if (!streetAddress.trim()) {
    errors.push("Street address is required.");
  }

  if (!city.trim()) {
    errors.push("City is required.");
  }

  if (!state.trim()) {
    errors.push("State is required.");
  }

  if (!/^\d{6}$/.test(pinCode.trim())) {
    errors.push("Please enter a valid 6-digit PIN code.");
  }

  setFormErrors(errors);

  return errors.length === 0;
};
  return (
    
    <main className="min-h-screen bg-[#f8f7f3] text-[#171717]">

      {/* Announcement Bar */}
      <div className="bg-[#171717] px-4 py-3 text-center text-[10px] tracking-[2px] text-white sm:text-xs">
        FREE SHIPPING ON ORDERS ABOVE ₹500
      </div>

      




      {/* Hero Section */}
      <section className="relative mx-auto max-w-[1440px] px-4 pt-5 md:px-10">

        <div
          className="relative flex min-h-[440px] items-end overflow-hidden bg-[#333] bg-[center_30%] bg-cover sm:min-h-[520px] md:min-h-[680px] md:bg-center"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,0,0,0.68), rgba(0,0,0,0.05)), url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=2000&q=90')",
          }}
        >

          <div className="max-w-2xl px-5 pb-10 text-white sm:px-7 sm:pb-12 md:px-16 md:pb-20">

            <p className="mb-5 text-[10px] font-semibold tracking-[4px] md:text-xs">
              THE NEW MENSWEAR EDITION — 2026
            </p>

            <h1 className="text-4xl font-bold leading-[1.08] tracking-[-1.5px] sm:text-5xl md:text-7xl">
              STYLE IS
              <br />
              YOUR
              <br />
              <span className="font-light italic">STATEMENT.</span>
            </h1>

            <p className="mt-5 max-w-sm text-xs leading-6 text-white/80 sm:text-sm sm:leading-7 md:mt-6">
              Discover a new standard of everyday dressing.
              Curated essentials for men who define their own style.
            </p>

            <a
              href="#products"
              className="mt-7 inline-flex items-center justify-center gap-5 bg-white px-5 py-4 text-[9px] font-bold tracking-[1.5px] text-black transition hover:bg-[#8b9275] hover:text-white sm:mt-9 sm:gap-8 sm:px-7 sm:text-[10px] sm:tracking-[2px]"
            >
              EXPLORE COLLECTION <span>↗</span>
            </a>

          </div>
        </div>
      </section>

      {/* Brand Statement */}
      <section id="about" className="mx-auto max-w-[1440px] px-5 py-14 text-center sm:px-6 sm:py-20 md:py-28">

        <p className="text-[10px] font-semibold tracking-[4px] text-[#8b9275]">
          MORE THAN JUST FASHION
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-2xl font-medium leading-tight tracking-[-1px] sm:text-3xl md:text-5xl">
          Designed for the ones who
          <span className="font-light italic"> stand apart.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-xs leading-6 text-gray-500 sm:mt-5 sm:text-sm sm:leading-7">
          Thoughtfully selected styles, timeless silhouettes and
          contemporary essentials. Your wardrobe starts here.
        </p>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-[1440px] px-4 pb-14 sm:px-5 sm:pb-20 md:px-10">

        <div className="mb-9 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">   
          <div>
            <p className="text-[10px] tracking-[3px] text-[#8b9275]">
              FIND YOUR LOOK
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
  SHOP BY CATEGORY
</h2>
          </div>

          <a href="#products" className="hidden text-xs underline underline-offset-4 md:block">
            VIEW ALL COLLECTIONS ↗
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-5">
          {categories.map((category) => (
            <a href="#products" key={category.name} className="group">
              <div className="overflow-hidden bg-[#e9e7e1]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 text-sm font-bold tracking-[1px]">
                {category.name} ↗
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {category.subtitle}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="bg-[#eeede7] px-4 py-14 sm:px-5 sm:py-20 md:px-10 md:py-24">

        <div className="mx-auto max-w-[1440px]">

          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-[10px] tracking-[3px] text-[#8b9275]">
                THE LATEST PICKS
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                TRENDING NOW
              </h2>
            </div>

            <a href="#products" className="text-xs underline underline-offset-4">
              VIEW ALL ↗
            </a>
          </div>
          <div className="mb-8 flex flex-nowrap items-center gap-2 overflow-x-auto pb-2 md:flex-wrap md:gap-3">
  {["All", ...Array.from(new Set(products.map((product) => product.category)))].map(
    (category) => (
      <button
        key={category}
        onClick={() => setSelectedCategory(category)}
        className={`shrink-0 border px-5 py-2 text-xs font-semibold uppercase tracking-wider transition ${
          selectedCategory === category
            ? "border-[#24231f] bg-[#24231f] text-white"
            : "border-gray-300 bg-transparent text-gray-600 hover:border-black hover:text-black"
        }`}
      >
        {category}
      </button>
    )
  )}
</div>
<div className="mb-6 flex flex-wrap items-center justify-between gap-2 sm:justify-end sm:gap-3">
  <label
    htmlFor="product-sort"
    className="text-xs font-semibold uppercase tracking-wider text-gray-500"
  >
    Sort by:
  </label>

  <select
    id="product-sort"
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    className="w-full max-w-[220px] border border-gray-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-black sm:w-auto sm:px-4"
  >
    <option value="default">Featured</option>
    <option value="price-low">Price: Low to High</option>
    <option value="price-high">Price: High to Low</option>
    <option value="name-az">Name: A to Z</option>
    <option value="name-za">Name: Z to A</option>
  </select>
</div>
{products.filter((product) => {
  const matchesSearch =
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase());

  const matchesCategory =
    selectedCategory === "All" ||
    product.category === selectedCategory;

  return matchesSearch && matchesCategory;
}).length === 0 && (
    <div className="py-16 text-center">
      <p className="text-lg font-semibold text-[#24231f]">
        No products found
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Try searching with a different product name or category.
      </p>
    </div>
  )}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
           {products
  .filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
    })
  .sort((a, b) => {
    const priceA = Number(String(a.price).replace(/[^\d.]/g, ""));
    const priceB = Number(String(b.price).replace(/[^\d.]/g, ""));

    switch (sortOption) {
      case "price-low":
        return priceA - priceB;

      case "price-high":
        return priceB - priceA;

      case "name-az":
        return a.name.localeCompare(b.name);

      case "name-za":
        return b.name.localeCompare(a.name);

      default:
        return 0;
    }
  })
  .map((product) => (
              <div key={product.id} className="group min-w-0">
                <Link
                href={`/products/${product.slug}`}
                className="block cursor-pointer"
                >
                <div className="relative overflow-hidden bg-white">
                  <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }}
  aria-label={
    wishlist.some((item) => item.slug === product.slug)
      ? "Remove from wishlist"
      : "Add to wishlist"
  }
  className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-xl shadow-md transition hover:scale-110"
>
  {wishlist.some((item) => item.slug === product.slug) ? "♥" : "♡"}
</button>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-105"
                  
                  />

                  <span className="absolute left-3 top-3 bg-white px-3 py-2 text-[8px] font-bold tracking-[1px]">
                    {product.tag}
                  </span>
                </div>
                </Link>

                <p className="mt-3 text-[9px] tracking-[1px] text-gray-500 sm:mt-4 sm:tracking-[1.5px]">
                  {product.category}
                </p>

                <h3 className="mt-1 min-h-10 text-xs font-semibold leading-5 sm:text-sm">
                <Link
                  href={`/products/${product.slug}`}
                  className="hover:underline cursor-pointer"
                >
                  {product.name}
                </Link>
              </h3>

                <p className="mt-2 text-xs font-medium sm:text-sm">
                  {product.price}
                </p>
                <button
  onClick={() => {
  setCart((prevCart) => {
    const existingProduct = prevCart.find(
      (item) => item.name === product.name
    );

    if (existingProduct) {
      return prevCart.map((item) =>
        item.name === product.name
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    }

    return [...prevCart, { ...product, quantity: 1 }];
  });
}}
  className="mt-3 w-full bg-[#171717] px-2 py-3 text-[10px] font-semibold tracking-[1px] text-white transition-colors hover:bg-[#8b9275] sm:mt-4 sm:text-xs sm:tracking-widest"
>
  ADD TO CART
</button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#22251e] px-6 py-20 text-center text-white">

        <p className="text-[10px] tracking-[4px] text-[#b5bd9c]">
          STAY IN THE LOOP
        </p>

        <h2 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl">
          GOOD STYLE. GREAT UPDATES.
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60">
          Be the first to discover new collections, exclusive releases
          and everything happening at Fashion Cart.
        </p>

        <a
          href="mailto:hello@fashioncart.example"
          className="mt-8 inline-block border border-white/50 px-8 py-4 text-[10px] tracking-[2px] transition hover:bg-white hover:text-black"
        >
          GET IN TOUCH ↗
        </a>
      </section>
{recentlyViewed.length > 0 && (
  <section className="bg-[#f7f6f2] px-4 py-12 sm:px-6 sm:py-16 md:px-10">
    <div className="mx-auto max-w-[1440px]">

      <div className="mb-8">
        <p className="text-xs tracking-[3px] text-gray-500 uppercase">
          Your browsing history
        </p>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Recently Viewed
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {recentlyViewed.map((product: any) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            className="group"
          >
            <div className="overflow-hidden bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <p className="mt-4 text-[9px] tracking-widest uppercase text-gray-500">
              {product.category}
            </p>

            <h3 className="mt-1 text-sm font-semibold">
              {product.name}
            </h3>

            <p className="mt-2 text-sm font-medium">
              {product.price}
            </p>
          </Link>
        ))}
      </div>

    </div>
  </section>
)}
      {/* Footer */}
      <footer className="bg-[#171717] px-6 py-10 text-white md:px-10">

        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row">

          <div>
            <h2 className="text-2xl font-black tracking-[-2px]">
              FASHION.CART
            </h2>
            <p className="mt-3 text-xs text-white/50">
              Redefining everyday menswear.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-[10px] tracking-[1px] text-white/70">
            <a href="#categories">COLLECTIONS</a>
            <a href="#about">ABOUT US</a>
            <a href="mailto:hello@fashioncart.example">CONTACT</a>
          </div>

        </div>

        <div className="mx-auto mt-10 max-w-[1440px] border-t border-white/15 pt-6 text-[10px] text-white/40">
          © 2026 FASHION CART. ALL RIGHTS RESERVED.
        </div>

      </footer>
<Checkout />
    </main>
  );
}
