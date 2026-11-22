"use client";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
function ProductDetailsContent() {
    const { products, cart, setCart, recentlyViewed, setRecentlyViewed } = useCart();
    const router = useRouter();
  const params = useParams();
  const slug = params.slug;
const product = products.find(
  (item) => item.slug === slug
);
const [quantity, setQuantity] = useState(1);
const [selectedSize, setSelectedSize] = useState("M");
const [selectedColor, setSelectedColor] = useState("Black");
const [selectedImage, setSelectedImage] = useState(0);
const [isZoomed, setIsZoomed] = useState(false);
const [reviewName, setReviewName] = useState("");
const [reviewComment, setReviewComment] = useState("");
const [newRating, setNewRating] = useState(5);

const [reviews, setReviews] = useState([
  {
    id: 1,
    name: "Alex Morgan",
    rating: 5,
    comment: "Excellent quality and perfect fit. Highly recommended!",
    date: "November 2026",
  },
  {
    id: 2,
    name: "Daniel Smith",
    rating: 4,
    comment: "Great product with a premium feel. Very happy with it.",
    date: "November 2026",
  },
]);
const averageRating =
  reviews.length > 0
    ? reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    : 0;

useEffect(() => {
  setQuantity(1);
  setSelectedImage(0);
}, [slug]);
useEffect(() => {
  if (!product) return;

  setRecentlyViewed((prev) => [
    product,
    ...prev.filter((item) => item.slug !== product.slug),
  ].slice(0, 8));
}, [product, setRecentlyViewed]);
  
  return (
    <main className="min-h-screen bg-[#faf9f6] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        {product ? (
          <>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-4 sm:text-sm">
  <button
    onClick={() => router.push("/")}
    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
  >
    <span className="text-lg">←</span>
    Back to Home
  </button>

  <span className="text-gray-300">|</span>

  <p className="text-sm text-gray-500">
    Home / Products / {product.name}
  </p>
</div>

            <div className="mt-8 grid items-start gap-12 md:grid-cols-2">

              {/* Product Images */}
              <div>
                <div className="overflow-hidden bg-[#f0efeb]">
                  <img
  src={product.images[selectedImage] || product.image}
  alt={product.name}
  onClick={() => setIsZoomed(true)}
  className="aspect-[4/5] w-full cursor-zoom-in object-cover transition-opacity duration-500 ease-in-out hover:opacity-95 sm:aspect-[4/5] md:aspect-[4/5]"
/>
                </div>

                <div className="mt-3 flex gap-2 overflow-x-auto pb-2 sm:mt-4 sm:gap-4 md:mt-5">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-20 w-16 overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-black"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Information */}
              <div className="flex min-w-0 flex-col md:sticky md:top-8">

                <p className="text-xs font-semibold uppercase tracking-[4px] text-[#8b806d]">
  {product.category}
</p>

                <h1 className="mt-5 font-serif text-4xl font-medium leading-tight tracking-tight text-[#202019] md:text-5xl lg:text-[56px]">
  {product.name}
</h1>

                <p className="mt-5 text-2xl font-semibold text-gray-900">
                  {product.price}
                </p>

                <div className="mt-5">
                  <span className="inline-block border border-gray-300 px-4 py-2 text-[10px] font-bold tracking-[2px] text-gray-700">
                    {product.tag}
                  </span>
                </div>

                <p className="mt-7 max-w-lg text-base leading-8 text-[#77756e]">
  {product.description}
</p>

                {/* Size Selection */}
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-900">
                    Select Size
                  </p>

                  <div className="mt-3 flex gap-3">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`h-11 w-11 border text-sm font-medium transition ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 text-gray-800 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colour Selection */}
                <div className="mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-900">
                    Select Colour: {selectedColor}
                  </p>

                  <div className="mt-3 flex gap-3">
                    {[
                      { name: "Black", color: "#171717" },
                      { name: "White", color: "#ffffff" },
                      { name: "Navy", color: "#1e3a5f" },
                      { name: "Olive", color: "#6b705c" },
                    ].map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                        className={`h-9 w-9 rounded-full border-2 ${
                          selectedColor === color.name
                            ? "border-gray-900 ring-2 ring-gray-300 ring-offset-2"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-900">
                    Quantity
                  </p>

                  <div className="mt-3 flex w-fit items-center border border-gray-300 bg-white">
                    <button
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      className="px-4 py-2 text-lg hover:bg-gray-100"
                    >
                      −
                    </button>

                    <span className="min-w-12 text-center text-sm">
                      {quantity}
                    </span>

                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="px-4 py-2 text-lg hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    console.log("Add to cart clicked!");
  setCart((prevCart) => { 
    const existingProduct = prevCart.find(
      (item) =>
        item.name === product.name &&
        item.size === selectedSize &&
        item.color === selectedColor
    );

    if (existingProduct) {
      return prevCart.map((item) =>
        item.name === product.name &&
        item.size === selectedSize &&
        item.color === selectedColor
          ? {
              ...item,
              quantity: (item.quantity || 1) + quantity,
            }
          : item
      );
    }

    console.log("Cart update completed!");

    return [
      ...prevCart,
      {
        ...product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      },
    ];
  });
  setQuantity(1);
  setSelectedSize("M");
  setSelectedColor("Black");
}}
                  className="group mt-8 flex w-full items-center justify-between border border-[#24231f] bg-[#24231f] px-7 py-5 text-xs font-semibold uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-[#8b806d] hover:border-[#8b806d]"
                >
                  <span>ADD TO BAG</span>
<span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
  →
</span>
                </button>

                {/* Product Specifications */}
                <div className="mt-10 border-t border-gray-200 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-900">
                    Product Information
                  </p>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    Carefully selected for quality, comfort and everyday style.
                  </p>

                  <div className="mt-6 border-t border-gray-200 pt-5">
                    <p className="text-xs font-semibold uppercase tracking-[2px] text-gray-900">
                      Product Specifications
                    </p>

                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex justify-between border-b border-gray-200 pb-3">
                        <span className="text-gray-500">Material</span>
                        <span className="font-medium text-gray-900">{product.specifications.material}</span>
                      </div>

                      <div className="flex justify-between border-b border-gray-200 pb-3">
                        <span className="text-gray-500">Fit</span>
                        <span className="font-medium text-gray-900">{product.specifications.fit}</span>
                      </div>

                      <div className="flex justify-between border-b border-gray-200 pb-3">
                        <span className="text-gray-500">Care</span>
                        <span className="font-medium text-gray-900">{product.specifications.care}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-gray-500">Product Type</span>
                        <span className="font-medium text-gray-900">{product.specifications.productType}</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
            {/* Customer Reviews */}
<section className="mt-20 border-t border-gray-200 pt-12">
  <div className="mb-10">
    <p className="text-xs uppercase tracking-[3px] text-gray-500">
      Customer Feedback
    </p>

    <h2 className="mt-2 text-3xl font-semibold tracking-tight">
      Reviews & Ratings
    </h2>
  </div>

  <div className="grid gap-10 md:grid-cols-3">

    {/* Rating Summary */}
    <div>
      <h3 className="text-5xl font-semibold">
  {averageRating.toFixed(1)}/5
</h3>

      <p className="mt-2 text-xl text-yellow-500">
  {"★".repeat(Math.round(averageRating))}
  {"☆".repeat(5 - Math.round(averageRating))}
</p>

      <p className="mt-2 text-sm text-gray-500">
        Based on {reviews.length} customer reviews
      </p>
    </div>

    {/* Review Cards */}
    <div className="space-y-8 md:col-span-2">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-gray-200 pb-6"
        >
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">
              {review.name}
            </h4>

            <span className="text-xs text-gray-400">
              {review.date}
            </span>
          </div>

          <p className="mt-2 text-yellow-500">
            {"★".repeat(review.rating)}
            {"☆".repeat(5 - review.rating)}
          </p>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            {review.comment}
          </p>
        </div>
      ))}
    </div>

  </div>
  {/* Write a Review */}
<div className="mt-12 border-t border-gray-200 pt-10">
  <h3 className="text-2xl font-semibold tracking-tight">
    Write a Review
  </h3>

  <form
    className="mt-6 max-w-2xl space-y-5"
    onSubmit={(event) => {
      event.preventDefault();

      if (!reviewName.trim() || !reviewComment.trim()) return;

      setReviews((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: reviewName,
          rating: newRating,
          comment: reviewComment,
          date: new Date().toLocaleDateString("en-IN", {
            month: "long",
            year: "numeric",
          }),
        },
      ]);

      setReviewName("");
      setReviewComment("");
      setNewRating(5);
    }}
  >
    <div>
      <label className="mb-2 block text-sm font-medium">
        Your Name
      </label>
      <input
        type="text"
        value={reviewName}
        onChange={(e) => setReviewName(e.target.value)}
        placeholder="Enter your name"
        className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
        required
      />
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium">
        Your Rating
      </label>
      <select
        value={newRating}
        onChange={(e) => setNewRating(Number(e.target.value))}
        className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
      >
        <option value={5}>★★★★★ - Excellent</option>
        <option value={4}>★★★★ - Very Good</option>
        <option value={3}>★★★ - Good</option>
        <option value={2}>★★ - Fair</option>
        <option value={1}>★ - Poor</option>
      </select>
    </div>

    <div>
      <label className="mb-2 block text-sm font-medium">
        Your Review
      </label>
      <textarea
        value={reviewComment}
        onChange={(e) => setReviewComment(e.target.value)}
        placeholder="Share your experience..."
        rows={4}
        className="w-full border border-gray-300 px-4 py-3 outline-none focus:border-black"
        required
      />
    </div>

    <button
      type="submit"
      className="bg-black px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-gray-800"
    >
      Submit Review
    </button>
  </form>
</div>
</section>
          </>
        ) : (
          <h1 className="text-2xl font-bold">
            Product Not Found
          </h1>
        )}
      </div>
     {isZoomed && product && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
    onClick={() => setIsZoomed(false)}
  >
    <button
      onClick={() => setIsZoomed(false)}
      className="absolute right-6 top-6 text-4xl text-white transition hover:text-gray-300"
    >
      ×
    </button>

    <img
      src={product.images[selectedImage] || product.image}
      alt={product.name}
      onClick={(event) => event.stopPropagation()}
      className="max-h-[90vh] max-w-[90vw] cursor-zoom-out object-contain"
    />
  </div>
)}
{product && (
  <section className="mt-20 border-t border-gray-200 pt-12">
    <div className="mb-8">
      <p className="text-xs uppercase tracking-[3px] text-gray-500">
        Complete Your Style
      </p>

      <h2 className="mt-2 text-3xl font-semibold tracking-tight">
        You May Also Like
      </h2>
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {products
  .filter((item) => item.slug !== product.slug)
  .sort(
    (a, b) =>
      Number(b.category === product.category) -
      Number(a.category === product.category)
  )
  .slice(0, 4)
  .map((item) => (
          <a
            key={item.slug}
            href={`/products/${item.slug}`}
            className="group"
          >
            <div className="overflow-hidden bg-white">
              <img
                src={item.image}
                alt={item.name}
                className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <p className="mt-4 text-[9px] uppercase tracking-widest text-gray-500">
              {item.category}
            </p>

            <h3 className="mt-1 text-sm font-semibold">
              {item.name}
            </h3>

            <p className="mt-2 text-sm font-medium">
              {item.price}
            </p>
          </a>
        ))}
    </div>
  </section>
)}
    </main>
  );
};

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f6]" />}>
      <ProductDetailsContent />
    </Suspense>
  );
}