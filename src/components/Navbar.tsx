
"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";


export default function Navbar() {
  const {
  products,
  cart,
  wishlist,
  isCartOpen,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
} = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const filteredProducts = products.filter((product) => {
  const query = searchQuery.toLowerCase().trim();

  return (
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );
});

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );
  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 bg-[#f8f7f3]/95 text-[#171717] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 md:px-10 md:py-7">

{/* Mobile Menu Button */}
<button
  type="button"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
  className="rounded-md p-2 transition hover:bg-black/5 md:hidden"
>
  {isMobileMenuOpen ? (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ) : (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )}
</button>
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-black tracking-[-2px] md:text-3xl"
        >
          FASHION<span className="text-[#8b9275]">.</span>CART
        </Link>

{/* Search Bar */}
<div className="relative hidden lg:block w-56 shrink-0">
  <input
    type="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search products..."
    className="w-full rounded-full border border-black/15 bg-white/70 px-5 py-3 text-sm outline-none transition focus:border-[#8b9275] focus:ring-1 focus:ring-[#8b9275]"
  />

  {searchQuery.trim() !== "" && (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-xl border border-black/10 bg-white p-2 shadow-xl">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            onClick={() => setSearchQuery("")}
            className="block rounded-lg px-4 py-3 text-sm transition hover:bg-[#f5f4ef]"
          >
            <span className="font-semibold">{product.name}</span>
            <span className="ml-2 text-xs text-gray-500">
              {product.category}
            </span>
          </Link>
        ))
      ) : (
        <p className="px-4 py-3 text-sm text-gray-500">
          No products found.
        </p>
      )}
    </div>
  )}
</div>
        {/* Navigation Links */}


        {/* Mobile Navigation Menu */}
{isMobileMenuOpen && (
  <div className="absolute left-0 top-full z-50 w-full border-t border-black/10 bg-[#f8f7f3] px-6 py-6 shadow-lg md:hidden">
    <div className="flex flex-col gap-5 text-sm font-semibold tracking-wider">
      {/* Mobile Search */}
<div className="relative mb-2">
  <input
    type="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search products..."
    className="w-full rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-normal tracking-normal outline-none focus:border-[#8b9275]"
  />

  {searchQuery.trim() !== "" && (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-black/10 bg-white p-2 shadow-xl">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            key={product.slug}
            href={`/products/${product.slug}`}
            onClick={() => {
              setSearchQuery("");
              setIsMobileMenuOpen(false);
            }}
            className="block rounded-lg px-4 py-3 text-sm font-medium tracking-normal hover:bg-[#f5f4ef]"
          >
            {product.name}
            <span className="ml-2 text-xs text-gray-500">
              {product.category}
            </span>
          </Link>
        ))
      ) : (
        <p className="px-4 py-3 text-sm font-normal tracking-normal text-gray-500">
          No products found.
        </p>
      )}
    </div>
  )}
</div>

      <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
        HOME
      </Link>

      <Link href="/#categories" onClick={() => setIsMobileMenuOpen(false)}>
        CATEGORIES
      </Link>

      <Link href="/#products" onClick={() => setIsMobileMenuOpen(false)}>
        SHOP
      </Link>

      <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)}>
        ABOUT
      </Link>

      <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
        WISHLIST ♡ {wishlist.length > 0 && `(${wishlist.length})`}
      </Link>

      <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)}>
        MY ORDERS
      </Link>

    </div>
  </div>
)}
        <div className="hidden items-center gap-9 text-sm font-semibold tracking-[1.5px] md:flex">
          <Link href="/" className="transition-colors hover:text-[#8b9275]">
            HOME
          </Link>

          <Link href="/#categories" className="transition-colors hover:text-[#8b9275]">
            CATEGORIES
          </Link>

          <Link href="/#products" className="transition-colors hover:text-[#8b9275]">
            SHOP
          </Link>

          <Link href="/#about" className="transition-colors hover:text-[#8b9275]">
            ABOUT
          </Link>

          <Link href="/wishlist" className="transition-colors hover:text-[#8b9275]">
            WISHLIST ♡ {wishlist.length > 0 && `(${wishlist.length})`}
          </Link>
          <Link href="/orders" className="transition-colors hover:text-[#8b9275]">
      MY ORDERS
          </Link>
        </div>

        {/* Account and Cart */}
        <div className="flex items-center gap-4">
          <Link
  href="/login"
  aria-label="Account"
  className="rounded-full p-2 transition-colors hover:bg-black/5"
>
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </svg>
</Link>

          <button
            aria-label="Shopping bag"
            className="relative rounded-full p-2 transition-colors hover:bg-black/5"
            onClick={() => setIsCartOpen(true)}
          >
            <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 8h14l1 13H4L5 8Z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}
