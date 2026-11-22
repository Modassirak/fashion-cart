"use client";

import { useCart } from "@/context/CartContext";

export default function AdminOrdersPage() {
  const { orders, setOrders } = useCart();
  console.log("ADMIN ORDERS:", orders);

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-semibold">Order Management</h1>
      <p className="mt-2 text-sm text-gray-500">
        Manage and track all customer orders.
      </p>

      <div className="mt-8 border border-black/10 bg-white p-6">
        <p className="text-sm text-gray-500">TOTAL ORDERS</p>
        <h2 className="mt-3 text-3xl font-semibold">{orders.length}</h2>
         </div>

      <div className="mt-8 overflow-x-auto border border-black/10 bg-white">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-[#f8f7f3] text-[10px] tracking-wider text-gray-500">
            <tr>
              <th className="px-6 py-4">ORDER ID</th>
              <th className="px-6 py-4">CUSTOMER</th>
              <th className="px-6 py-4">DATE</th>
              <th className="px-6 py-4">TOTAL</th>
              <th className="px-6 py-4">STATUS</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-black/5 text-sm">
                <td className="px-6 py-4 font-semibold">#{order.id}</td>
                <td className="px-6 py-4">{order.customerName || "Customer"}</td>
                <td className="px-6 py-4 text-gray-500">{order.date || "—"}</td>
                <td className="px-6 py-4 font-semibold">
                  ₹{Number(order.total || 0).toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4">{order.status || "Pending"}</td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-500">
                  No orders found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}