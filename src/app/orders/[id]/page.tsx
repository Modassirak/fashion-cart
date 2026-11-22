
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function OrderDetailsPage() {
  const params = useParams();
  const { orders } = useCart();

  const order = orders.find(
    (item: any) => item.id === params.id
  );

  if (!order) {
    return (
      <main className="min-h-screen bg-[#faf9f6] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-serif text-[#202019]">
            Order Not Found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            We couldn't find the order you're looking for.
          </p>

          <Link
            href="/orders"
            className="mt-8 inline-block bg-black px-8 py-4 text-xs font-semibold tracking-widest text-white"
          >
            BACK TO MY ORDERS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-12">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/orders"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to My Orders
        </Link>

        <p className="mt-8 text-xs tracking-[4px] text-gray-500">
          FASHION CART
        </p>

        <h1 className="mt-3 text-4xl font-serif text-[#202019]">
          Order Details
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Order Reference: {order.id}
        </p>

<div className="mt-8 grid grid-cols-1 gap-5 border border-gray-200 bg-white p-6 sm:grid-cols-3">
  <div>
    <p className="text-xs text-gray-400">ORDER DATE</p>
    <p className="mt-2 text-sm font-medium">{order.date}</p>
  </div>

  <div>
    <p className="text-xs text-gray-400">ORDER STATUS</p>
    <span className="mt-2 inline-block bg-[#eef0e8] px-3 py-1 text-xs font-semibold text-[#697052]">
      {order.status || "Order Placed"}
    </span>
  </div>

  <div>
    <p className="text-xs text-gray-400">ORDER TOTAL</p>
    <p className="mt-2 text-lg font-semibold">
      ₹{Number(order.total).toLocaleString("en-IN")}
    </p>
  </div>
</div>

<div className="mt-8 border border-gray-200 bg-white p-6">
  <h2 className="text-lg font-serif text-[#202019]">
    Items Ordered
  </h2>

  <div className="mt-5 divide-y divide-gray-100">
    {order.items.map((item: any, index: number) => (
      <div
        key={`${order.id}-${index}`}
        className="flex items-center justify-between gap-4 py-4"
      >
        <div>
          <p className="text-sm font-medium text-[#202019]">
            {item.name}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Quantity: {item.quantity || 1}
          </p>
        </div>

        <p className="text-sm font-semibold">
          ₹{(
            Number(String(item.price).replace(/[^\d.]/g, "")) *
            (item.quantity || 1)
          ).toLocaleString("en-IN")}
        </p>
      </div>
    ))}
  </div>
</div>
<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
  <div className="border border-gray-200 bg-white p-6">
    <h2 className="text-lg font-serif text-[#202019]">
      Shipping Details
    </h2>

    <div className="mt-4 space-y-2 text-sm text-gray-500">
      <p className="font-medium text-[#202019]">
        {order.customer.name}
      </p>
      <p>{order.customer.email}</p>
      <p>{order.customer.phone}</p>
      <p>{order.customer.address}</p>
      <p>
        {order.customer.city}, {order.customer.state} - {order.customer.pinCode}
      </p>
    </div>
  </div>

  <div className="border border-gray-200 bg-white p-6">
    <h2 className="text-lg font-serif text-[#202019]">
      Payment Details
    </h2>

    <div className="mt-4 space-y-3 text-sm">
      <div className="flex justify-between gap-4">
        <span className="text-gray-500">Payment Method</span>
        <span className="font-medium">{order.paymentMethod}</span>
      </div>

      <div className="flex justify-between gap-4 border-t border-gray-100 pt-3">
        <span className="text-gray-500">Order Total</span>
        <span className="font-semibold">
          ₹{Number(order.total).toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  </div>
</div>
      </div>
    </main>
  );
}
