
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function AdminPage() {
  const { orders } = useCart();

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  const stats = [
    {
      title: "TOTAL REVENUE",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      note: "Revenue from recorded orders",
    },
    {
      title: "TOTAL ORDERS",
      value: orders.length,
      note: "Orders placed in this session",
    },
    {
      title: "TOTAL PRODUCTS",
      value: products.length,
      note: "Products in your catalogue",
    },
    {
      title: "TOTAL CUSTOMERS",
      value: "—",
      note: "Available after backend integration",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-[3px] text-[#8b9275]">
            FASHION CART
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back. Here's what's happening with your store.
          </p>
        </div>

        <Link
          href="/"
          className="border border-black/15 bg-white px-5 py-3 text-xs font-semibold tracking-wider transition hover:bg-[#171717] hover:text-white"
        >
          VIEW STORE →
        </Link>
      </div>

      {/* Statistics */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="border border-black/10 bg-white p-6"
          >
            <p className="text-[10px] font-semibold tracking-[2px] text-gray-500">
              {stat.title}
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              {stat.value}
            </h2>

            <p className="mt-3 text-xs text-gray-400">
              {stat.note}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <section className="mt-10 border border-black/10 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 p-6">
          <div>
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <p className="mt-1 text-xs text-gray-500">
              Latest customer purchases
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-xs font-semibold underline underline-offset-4 hover:text-[#8b9275]"
          >
            VIEW ALL ORDERS →
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <h3 className="font-semibold">No orders yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Customer orders will appear here when they are placed.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="bg-[#f8f7f3] text-[10px] tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4">ORDER ID</th>
                  <th className="px-6 py-4">CUSTOMER</th>
                  <th className="px-6 py-4">TOTAL</th>
                  <th className="px-6 py-4">STATUS</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(-5).reverse().map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-black/5 text-sm"
                  >
                    <td className="px-6 py-4 font-medium">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.customer?.fullName || "Customer"}
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ₹{Number(order.total || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-[#eef0e8] px-3 py-1 text-xs font-medium text-[#697052]">
                        {order.status || "Order Placed"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Quick Management */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold">Quick Management</h2>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { title: "Manage Products", href: "/admin/products" },
            { title: "Manage Orders", href: "/admin/orders" },
            { title: "Manage Inventory", href: "/admin/inventory" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border border-black/10 bg-white p-6 text-sm font-semibold transition hover:border-[#8b9275] hover:bg-[#f1f1eb]"
            >
              {item.title}
              <span className="ml-2 text-[#8b9275]">→</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
