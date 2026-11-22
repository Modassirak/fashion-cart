
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function OrdersPage() {
  const { orders } = useCart();

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <p className="text-xs tracking-[4px] text-gray-500">
          FASHION CART
        </p>

        <h1 className="mt-3 text-4xl font-serif text-[#202019]">
          My Orders
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          View and track your previous purchases.
        </p>

        {orders.length === 0 ? (
          <div className="mt-12 border border-gray-200 bg-white p-12 text-center">
            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-3 text-sm text-gray-500">
              Your completed orders will appear here.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block bg-black px-8 py-4 text-xs font-semibold tracking-widest text-white hover:bg-gray-800"
            >
              START SHOPPING
            </Link>
          </div>
        ) : (
          <div className="mt-10 space-y-6">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="border border-gray-200 bg-white p-6"
              >
                <div className="grid grid-cols-1 gap-5 border-b border-gray-100 pb-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      ORDER REFERENCE
                    </p>
                    <h2 className="mt-2 font-semibold">
                      {order.id}
                    </h2>
                  </div>
<div>
  <p className="text-xs text-gray-400">
    ORDER STATUS
  </p>
  <span className="mt-2 inline-block bg-[#eef0e8] px-3 py-1 text-xs font-semibold text-[#697052]">
    {order.status || "Order Placed"}
  </span>
</div>
                  <div>
                    <p className="text-xs text-gray-400">
                      ORDER DATE
                    </p>
                    <p className="mt-2 text-sm">
                      {order.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      ORDER TOTAL
                    </p>
                    <p className="mt-2 font-semibold">
                      ₹{Number(order.total).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-gray-500">
                    ITEMS ORDERED
                  </p>

                  {order.items.map((item: any, index: number) => (
                    <div
                      key={`${order.id}-${index}`}
                      className="flex justify-between gap-4 py-2 text-sm"
                    >
                      <span>
                        {item.name} × {item.quantity || 1}
                      </span>
                      <span>
                        ₹{Number(
                          String(item.price).replace(/[^\d.]/g, "")
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4">
  <div className="text-sm text-gray-500">
    <p>Customer: {order.customer.name}</p>
    <p className="mt-1">Payment: {order.paymentMethod}</p>
  </div>

  <Link
    href={`/orders/${order.id}`}
    className="bg-black px-6 py-3 text-xs font-semibold tracking-widest text-white transition hover:bg-gray-800"
  >
    VIEW DETAILS
  </Link>
</div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
