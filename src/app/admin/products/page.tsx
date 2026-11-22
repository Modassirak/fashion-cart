
"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function AdminProductsPage() {
  const { products, setProducts } = useCart();
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
const [formData, setFormData] = useState({
  
  name: "",
  price: "",
  category: "",
  tag: "",
  description: "",
  image: "",
  images: "",
  material: "",
  fit: "",
  care: "",
  productType: "",
});
const handleEditClick = (product: (typeof products)[number]) => {
  setEditingProductId(product.id);

  setFormData({
    name: product.name,
    price: product.price.replace(/[^\d.]/g, ""),
    category: product.category,
    tag: product.tag,
    description: product.description,
    image: product.image,
    images: product.images.slice(1).join(", "),
    material: product.specifications.material,
    fit: product.specifications.fit,
    care: product.specifications.care,
    productType: product.specifications.productType,
  });

    setShowAddForm(true);
};

const handleDeleteProduct = (id: number) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmed) return;

  setProducts((prev) => prev.filter((product) => product.id !== id));
};

const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (
    !formData.name.trim() ||
    !formData.price ||
    !formData.category.trim() ||
    !formData.description.trim() ||
    !formData.image.trim()
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  const newProduct = {
    id: Date.now(),
    name: formData.name.trim(),
    slug: formData.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    description: formData.description.trim(),
    specifications: {
      material: formData.material,
      fit: formData.fit,
      care: formData.care,
      productType: formData.productType,
    },
    category: formData.category.trim().toUpperCase(),
    price: `₹${Number(formData.price).toLocaleString("en-IN")}`,
    image: formData.image.trim(),
    images: [
      formData.image.trim(),
      ...formData.images
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean),
    ],
    tag: formData.tag.trim().toUpperCase(),
  };

  if (editingProductId !== null) {
  setProducts((prev) =>
    prev.map((product) =>
      product.id === editingProductId
        ? { ...newProduct, id: editingProductId }
        : product
    )
  );
} else {
  setProducts((prev) => [...prev, newProduct]);
}

  setFormData({
    name: "",
    price: "",
    category: "",
    tag: "",
    description: "",
    image: "",
    images: "",
    material: "",
    fit: "",
    care: "",
    productType: "",
  });

  setShowAddForm(false);
setEditingProductId(null);
  alert("Product added successfully!");
};
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[3px] text-[#8b9275]">
            CATALOGUE MANAGEMENT
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Products
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your Fashion Cart product catalogue.
          </p>
        </div>

        <button
  type="button"
  onClick={() => setShowAddForm(!showAddForm)}
  className="bg-[#171717] px-5 py-3 text-xs font-semibold tracking-wider text-white transition hover:bg-[#8b9275]"
>
  {showAddForm ? "CANCEL" : "+ ADD PRODUCT"}
</button>
      </div>
{/* Add Product Form */}
{showAddForm && (
  <div className="mt-8 border border-black/10 bg-white p-6 sm:p-8">
    <h2 className="text-xl font-semibold">Add New Product</h2>

    <p className="mt-2 text-sm text-gray-500">
      Enter the details of your new product.
    </p>

    <form
  onSubmit={handleAddProduct}
  className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"
>
      <div>
        <label className="mb-2 block text-xs font-semibold">
          PRODUCT NAME
        </label>
        <input
  type="text"
  value={formData.name}
  onChange={(e) =>
    setFormData({ ...formData, name: e.target.value })
  }
  placeholder="Enter product name"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold">
          PRICE
        </label>
        <input
  type="number"
  value={formData.price}
  onChange={(e) =>
    setFormData({ ...formData, price: e.target.value })
  }
  placeholder="Enter price (e.g. 799)"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold">
          CATEGORY
        </label>
        <input
  type="text"
  value={formData.category}
  onChange={(e) =>
    setFormData({ ...formData, category: e.target.value })
  }
  placeholder="e.g. BASIC COLLECTION"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold">
          PRODUCT TAG
        </label>
        <input
  type="text"
  value={formData.tag}
  onChange={(e) =>
    setFormData({ ...formData, tag: e.target.value })
  }
  placeholder="e.g. BESTSELLER"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-xs font-semibold">
          DESCRIPTION
        </label>
        <textarea
  rows={3}
  value={formData.description}
  onChange={(e) =>
    setFormData({ ...formData, description: e.target.value })
  }
  placeholder="Describe your product..."
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-xs font-semibold">
          MAIN IMAGE URL
        </label>
        <input
  type="url"
  value={formData.image}
  onChange={(e) =>
    setFormData({ ...formData, image: e.target.value })
  }
  placeholder="https://example.com/product-image.jpg"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div className="sm:col-span-2">
        <label className="mb-2 block text-xs font-semibold">
          ADDITIONAL IMAGE URLS
        </label>
        <textarea
  rows={2}
  value={formData.images}
  onChange={(e) =>
    setFormData({ ...formData, images: e.target.value })
  }
  placeholder="Enter image URLs separated by commas"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold">
          MATERIAL
        </label>
        <input
  type="text"
  value={formData.material}
  onChange={(e) =>
    setFormData({ ...formData, material: e.target.value })
  }
  placeholder="e.g. 100% Cotton"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold">
          FIT
        </label>
        <input
  type="text"
  value={formData.fit}
  onChange={(e) =>
    setFormData({ ...formData, fit: e.target.value })
  }
  placeholder="e.g. Regular Fit"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold">
          CARE
        </label>
        <input
  type="text"
  value={formData.care}
  onChange={(e) =>
    setFormData({ ...formData, care: e.target.value })
  }
  placeholder="e.g. Machine Wash"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold">
          PRODUCT TYPE
        </label>
        <input
  type="text"
  value={formData.productType}
  onChange={(e) =>
    setFormData({ ...formData, productType: e.target.value })
  }
  placeholder="e.g. Men's T-Shirt"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
/>
      </div>

      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button
          type="button"
          onClick={() => setShowAddForm(false)}
          className="border border-black/15 px-6 py-3 text-xs font-semibold tracking-wider transition hover:bg-gray-100"
        >
          CANCEL
        </button>

        <button
  type="submit"
  className="bg-[#171717] px-6 py-3 text-xs font-semibold tracking-wider text-white transition hover:bg-[#8b9275]"
>
  {editingProductId !== null ? "SAVE CHANGES" : "SAVE PRODUCT"}
</button>
      </div>
    </form>
  </div>
)}
      {/* Product Summary */}
      <div className="mt-10 border border-black/10 bg-white p-6">
        <p className="text-xs font-semibold tracking-wider text-gray-500">
          TOTAL PRODUCTS
        </p>

        <h2 className="mt-3 text-3xl font-semibold">
          {products.length}
        </h2>
      </div>

      {/* Search */}
      <div className="mt-8">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name..."
          className="w-full max-w-md border border-black/10 bg-white px-5 py-3 text-sm outline-none focus:border-[#8b9275]"
        />
      </div>

      {/* Product Table */}
      <div className="mt-6 overflow-x-auto border border-black/10 bg-white">
        <table className="w-full min-w-[750px] text-left">
          <thead className="bg-[#f8f7f3] text-[10px] tracking-wider text-gray-500">
            <th className="px-6 py-4">ACTIONS</th>
            <tr>
              <th className="px-6 py-4">PRODUCT</th>
              <th className="px-6 py-4">CATEGORY</th>
              <th className="px-6 py-4">PRICE</th>
              <th className="px-6 py-4">TAG</th>
              <th className="px-6 py-4">ID</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t border-black/5 text-sm"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-14 w-12 object-cover"
                    />

                    <span className="font-semibold">
                      {product.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {product.category}
                </td>

                <td className="px-6 py-4 font-semibold">
                  {product.price}
                </td>

                <td className="px-6 py-4">
                  {product.tag}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  #{product.id}
                </td>
                <td className="px-6 py-4">
  <div className="flex items-center gap-3">
    <button
      type="button"
      onClick={() => handleEditClick(product)}
      className="text-xs font-semibold text-blue-600 hover:underline"
    >
      EDIT
    </button>

    <button
      type="button"
      onClick={() => handleDeleteProduct(product.id)}
      className="text-xs font-semibold text-red-600 hover:underline"
    >
      DELETE
    </button>
  </div>
</td>
              </tr>
            ))}

            {filteredProducts.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-sm text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Link
        href="/admin"
        className="mt-8 inline-block text-xs font-semibold tracking-wider text-gray-500 hover:text-black"
      >
        ← BACK TO DASHBOARD
      </Link>
    </div>
  );
}
