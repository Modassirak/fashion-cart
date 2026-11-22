
"use client";

import { useCart } from "@/context/CartContext";

export default function AdminCustomersPage() {
  const { orders } = useCart();

    const customers = Array.from(
    new Map(
      orders
        .filter((order) => order.customer?.email)
        .map((order) => [
          order.customer.email,
          {
            ...order.customer,
            orderCount: orders.filter(
              (item) =>
                item.customer?.email === order.customer.email
            ).length,
          },
        ])
    ).values()
  );

  const repeatCustomers = customers.filter(
    (customer) => customer.orderCount > 1
  ).length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          Customers
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage and view your store customers.
        </p>
      </div>

     {/* Customer Statistics */}
<div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
  <div className="rounded-2xl border border-gray-200 bg-white p-6">
    <p className="text-sm text-gray-500">Total Customers</p>
    <h2 className="mt-3 text-3xl font-semibold text-gray-900">
      0
    </h2>
  </div>

  <div className="rounded-2xl border border-gray-200 bg-white p-6">
    <p className="text-sm text-gray-500">Total Orders</p>
    <h2 className="mt-3 text-3xl font-semibold text-gray-900">
      {orders.length}
    </h2>
  </div>

  <div className="rounded-2xl border border-gray-200 bg-white p-6">
    <p className="text-sm text-gray-500">Repeat Customers</p>
    <h2 className="mt-3 text-3xl font-semibold text-gray-900">
      0
    </h2>
  </div>
</div>

      {/* Customer Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Customer List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Phone</th>
                <th className="px-6 py-4 font-medium">Orders</th>
              </tr>
            </thead>

            <tbody>
              {customers.length === 0 ? (
  <tr>
    <td
      colSpan={4}
      className="px-6 py-10 text-center text-gray-500"
    >
      No customers found yet.
    </td>
  </tr>
) : (
  customers.map((customer) => (
    <tr key={customer.email} className="border-t border-gray-100">
      <td className="px-6 py-4 font-medium text-gray-900">
        {customer.name || "Unknown"}
      </td>
      <td className="px-6 py-4 text-gray-600">
        {customer.email}
      </td>
      <td className="px-6 py-4 text-gray-600">
        {customer.phone || "—"}
      </td>
      <td className="px-6 py-4 text-gray-600">
        {customer.orderCount}
      </td>
    </tr>
  ))
)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
