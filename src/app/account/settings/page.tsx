
"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/account"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Account
        </Link>

        <p className="mt-8 text-xs tracking-[4px] text-gray-500">
          FASHION CART
        </p>

        <h1 className="mt-3 text-4xl font-serif text-[#202019]">
          Account Settings
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Manage your account preferences and security.
        </p>

        <div className="mt-10 space-y-6">

          <section className="border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-serif text-[#202019]">
              Email Preferences
            </h2>

            <div className="mt-6 space-y-5">
              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Receive updates and announcements by email.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="h-5 w-5 accent-black"
                />
              </label>

              <div className="border-t border-gray-100" />

              <label className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Order Updates</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Receive notifications about your orders.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={orderUpdates}
                  onChange={(e) => setOrderUpdates(e.target.checked)}
                  className="h-5 w-5 accent-black"
                />
              </label>
            </div>
          </section>

          <section className="border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-serif text-[#202019]">
              Password & Security
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Manage your password and account security.
            </p>

            <Link
              href="/account/change-password"
              className="mt-5 inline-block border border-black px-6 py-3 text-xs font-semibold tracking-widest text-black transition hover:bg-black hover:text-white"
            >
              CHANGE PASSWORD
            </Link>
          </section>

          <section className="border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-serif text-[#202019]">
              Account Information
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/account/profile"
                className="bg-black px-6 py-3 text-xs font-semibold tracking-widest text-white hover:bg-gray-800"
              >
                EDIT PROFILE
              </Link>

              <Link
                href="/account/addresses"
                className="border border-gray-300 px-6 py-3 text-xs font-semibold tracking-widest text-black hover:border-black"
              >
                MANAGE ADDRESSES
              </Link>
            </div>
          </section>

          <section className="border border-red-200 bg-white p-6">
            <h2 className="text-xl font-serif text-red-700">
              Danger Zone
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Account deletion will be available after backend integration.
            </p>

            <button
              type="button"
              disabled
              className="mt-5 cursor-not-allowed border border-red-200 px-6 py-3 text-xs font-semibold tracking-widest text-red-300"
            >
              DELETE ACCOUNT
            </button>
          </section>

        </div>
      </div>
    </main>
  );
}
