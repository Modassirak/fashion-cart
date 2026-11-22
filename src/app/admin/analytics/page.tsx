
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function AnalyticsPage() {
  const { orders } = useCart();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const averageOrderValue =
    orders.length > 0 ? totalRevenue / orders.length : 0;

  const monthlySales = Array.from({ length: 6 }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - index));

    const month = date.getMonth();
    const year = date.getFullYear();

    const revenue = orders.reduce((sum, order) => {
      const orderDate = new Date(order.date);

      if (
        order.date &&
        orderDate.getMonth() === month &&
        orderDate.getFullYear() === year
      ) {
        return sum + Number(order.total || 0);
      }

      return sum;
    }, 0);

    return {
      name: date.toLocaleString("en-IN", { month: "short" }),
      revenue,
    };
  });

  const highestRevenue = Math.max(
    ...monthlySales.map((month) => month.revenue),
    1
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <p className="text-[10px] font-semibold tracking-[3px] text-[#8b9275]">
          STORE PERFORMANCE
        </p>

        <h1 className="mt-3 text-3xl font-semibold">
          Sales Analytics
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Track your store's revenue and order performance.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="border border-black/10 bg-white p-6">
          <p className="text-xs tracking-wider text-gray-500">
            TOTAL REVENUE
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </h2>
        </div>

        <div className="border border-black/10 bg-white p-6">
          <p className="text-xs tracking-wider text-gray-500">
            TOTAL ORDERS
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            {orders.length}
          </h2>
        </div>

        <div className="border border-black/10 bg-white p-6">
          <p className="text-xs tracking-wider text-gray-500">
            AVERAGE ORDER VALUE
          </p>
          <h2 className="mt-4 text-3xl font-semibold">
            ₹{Math.round(averageOrderValue).toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <section className="mt-10 border border-black/10 bg-white p-6 sm:p-8">
        <div>
          <h2 className="text-lg font-semibold">
            Monthly Revenue
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Revenue from the last six calendar months
          </p>
        </div>

        <div className="mt-10 flex h-64 items-end justify-around gap-3 border-b border-l border-black/10 px-3">
          {monthlySales.map((month) => (
            <div
              key={month.name}
              className="flex h-full flex-1 flex-col items-center justify-end gap-3"
            >
              <span className="text-[10px] text-gray-500">
                {month.revenue > 0
                  ? `₹${month.revenue.toLocaleString("en-IN")}`
                  : ""}
              </span>

              <div
                className="w-full max-w-14 bg-[#8b9275] transition-all hover:bg-[#697052]"
                style={{
                  height: `${Math.max(
                    (month.revenue / highestRevenue) * 75,
                    2
                  )}%`,
                }}
                title={`₹${month.revenue.toLocaleString("en-IN")}`}
              />

              <span className="text-xs text-gray-500">
                {month.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Order Summary */}
      <section className="mt-8 border border-black/10 bg-white p-6">
        <h2 className="font-semibold">Order Summary</h2>

        <div className="mt-5 flex items-center justify-between border-b border-black/5 py-4 text-sm">
          <span className="text-gray-500">Total Orders</span>
          <span className="font-semibold">{orders.length}</span>
        </div>

        <div className="flex items-center justify-between py-4 text-sm">
          <span className="text-gray-500">Average Order Value</span>
          <span className="font-semibold">
            ₹{Math.round(averageOrderValue).toLocaleString("en-IN")}
          </span>
        </div>
      </section>

      <Link
        href="/admin"
        className="mt-8 inline-block text-xs font-semibold tracking-wider text-gray-500 hover:text-black"
      >
        ← BACK TO DASHBOARD
      </Link>
    </div>
  );
}
