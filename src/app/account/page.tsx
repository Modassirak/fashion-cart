"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
export default function AccountPage() {
    const { orders, wishlist, addresses } = useCart();
  return (
    <main className="min-h-screen bg-[#f8f7f3] px-5 py-12 text-[#171717]">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-8 sm:flex-row sm:items-center">

          <div>
            <p className="text-[10px] font-semibold tracking-[3px] text-[#8b9275]">
              MY ACCOUNT
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Welcome, Customer
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your personal information and shopping activity.
            </p>
          </div>

          <Link
            href="/"
            className="w-fit border border-black/20 px-5 py-3 text-xs font-semibold tracking-wider transition hover:bg-[#171717] hover:text-white"
          >
            CONTINUE SHOPPING →
          </Link>

        </div>

        {/* Account Overview */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="border border-black/10 bg-white p-6">
            <p className="text-xs text-gray-500">TOTAL ORDERS</p>
            <h2 className="mt-3 text-3xl font-semibold">{orders.length}</h2>
            <p className="mt-2 text-xs text-gray-400">
              Your shopping history
            </p>
          </div>

          <div className="border border-black/10 bg-white p-6">
            <p className="text-xs text-gray-500">SAVED ADDRESSES</p>
            <h2 className="mt-3 text-3xl font-semibold">{addresses.length}</h2>
            <p className="mt-2 text-xs text-gray-400">
              Your delivery locations
            </p>
          </div>

          <div className="border border-black/10 bg-white p-6">
            <p className="text-xs text-gray-500">WISHLIST ITEMS</p>
            <h2 className="mt-3 text-3xl font-semibold">{wishlist.length}</h2>
            <p className="mt-2 text-xs text-gray-400">
              Your favourite products
            </p>
          </div>

        </div>

        {/* Account Navigation */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold">
            Account Management
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

            <Link
              href="/account/profile"
              className="group border border-black/10 bg-white p-6 transition hover:border-[#8b9275]"
            >
              <h3 className="font-semibold">Personal Profile ↗</h3>
              <p className="mt-2 text-sm text-gray-500">
                Manage your name, email and phone number.
              </p>
            </Link>

            <Link
              href="/account/addresses"
              className="group border border-black/10 bg-white p-6 transition hover:border-[#8b9275]"
            >
              <h3 className="font-semibold">Saved Addresses ↗</h3>
              <p className="mt-2 text-sm text-gray-500">
                Add and manage your delivery addresses.
              </p>
            </Link>

            <Link
              href="/orders"
              className="group border border-black/10 bg-white p-6 transition hover:border-[#8b9275]"
            >
              <h3 className="font-semibold">My Orders ↗</h3>
              <p className="mt-2 text-sm text-gray-500">
                View your previous purchases and order details.
              </p>
            </Link>

            <Link
              href="/wishlist"
              className="group border border-black/10 bg-white p-6 transition hover:border-[#8b9275]"
            >
              <h3 className="font-semibold">My Wishlist ↗</h3>
              <p className="mt-2 text-sm text-gray-500">
                Explore your saved favourite products.
              </p>
            </Link>

            <Link
              href="/account/settings"
              className="group border border-black/10 bg-white p-6 transition hover:border-[#8b9275]"
            >
              <h3 className="font-semibold">Account Settings ↗</h3>
              <p className="mt-2 text-sm text-gray-500">
                Manage your account preferences.
              </p>
            </Link>

          </div>
        </div>

        {/* Logout */}
        <div className="mt-12 border-t border-black/10 pt-7">
  <Link
    href="/login"
    className="inline-block text-xs font-semibold tracking-wider text-red-600 transition hover:text-red-800"
  >
    SIGN OUT
  </Link>
</div>

      </div>
    </main>
  );
}
