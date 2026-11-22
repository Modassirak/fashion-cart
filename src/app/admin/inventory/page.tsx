
"use client";

import { useCart } from "@/context/CartContext";

export default function AdminInventoryPage() {
  const { products, setProducts } = useCart();
    const lowStock = products.filter(
    (product) => (product.stock ?? 0) > 0 && (product.stock ?? 0) <= 5
  ).length;

  const outOfStock = products.filter(
    (product) => (product.stock ?? 0) === 0
  ).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Inventory
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Monitor product stock and manage inventory levels.
        </p>
      </div>

      {/* Inventory Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Total Products</p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            {products.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Low Stock</p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            {lowStock}
          </h2>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <p className="text-sm text-gray-500">Out of Stock</p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            {outOfStock}
          </h2>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Product Stock
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Update Stock</th>
              </tr>
            </thead>

            <tbody>
  {products.length === 0 ? (
    <tr>
      <td
        colSpan={6}
        className="px-6 py-10 text-center text-gray-500"
      >
        No products found.
      </td>
    </tr>
  ) : (
    products.map((product) => {
      const stock = product.stock ?? 0;

      const status =
        stock === 0
          ? "Out of Stock"
          : stock <= 5
          ? "Low Stock"
          : "In Stock";

      return (
        <tr key={product.id} className="border-t border-gray-100">
          <td className="px-6 py-4 font-medium text-gray-900">
            {product.name}
          </td>

          <td className="px-6 py-4 text-gray-600">
            {product.category}
          </td>

          <td className="px-6 py-4 text-gray-600">
            {product.price}
          </td>

          {/* Stock Quantity */}
<td className="px-6 py-4 text-gray-600">
  {stock}
</td>

{/* Status */}
<td className="px-6 py-4">
  <span
    className={`rounded-full px-3 py-1 text-xs font-medium ${
      stock === 0
        ? "bg-red-100 text-red-700"
        : stock <= 5
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700"
    }`}
  >
    {status}
  </span>
</td>

{/* Update Stock */}
<td className="px-6 py-4">
  <input
    type="number"
    min="0"
    value={product.stock ?? ""}
    onChange={(e) => {
      const value = e.target.value;

      setProducts((previousProducts) =>
        previousProducts.map((item) =>
          item.id === product.id
            ? {
                ...item,
                stock:
                  value === ""
                    ? undefined
                    : Math.max(0, Number(value)),
              }
            : item
        )
      );
    }}
    className="w-20 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
  />
</td>
        </tr>
      );
    })
  )}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
