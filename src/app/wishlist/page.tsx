
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlist, setWishlist, setCart } = useCart();
const moveToCart = (product: any) => {
  setCart((prevCart) => {
    const existingProduct = prevCart.find(
      (item) => item.slug === product.slug
    );

    if (existingProduct) {
      return prevCart.map((item) =>
        item.slug === product.slug
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    }

    return [...prevCart, { ...product, quantity: 1 }];
  });

  setWishlist((prevWishlist) =>
    prevWishlist.filter((item) => item.slug !== product.slug)
  );
};
  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-16 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-gray-500">
            Your favourites
          </p>

          <h1 className="font-serif text-4xl text-[#24231f] md:text-5xl">
            My Wishlist
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            {wishlist.length} saved {wishlist.length === 1 ? "item" : "items"}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="py-24 text-center">
            <p className="mb-4 text-5xl">♡</p>

            <h2 className="font-serif text-2xl text-[#24231f]">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Save your favourite pieces and find them here.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block bg-[#24231f] px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-black"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((product) => (
              <div key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <div className="overflow-hidden bg-white">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {product.category}
                  </p>

                  <h3 className="mt-1 text-sm font-semibold">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium">
                    {product.price}
                  </p>
                  <button
  onClick={() => moveToCart(product)}
  className="mt-4 w-full bg-[#171717] px-4 py-3 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-[#8b9275]"
>
  MOVE TO CART
</button>
                  <button
                    onClick={() =>
                      setWishlist((prev) =>
                        prev.filter((item) => item.slug !== product.slug)
                      )
                    }
                    className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500 underline underline-offset-4 transition hover:text-black"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
