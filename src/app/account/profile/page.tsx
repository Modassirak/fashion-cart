
"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Profile changes are currently a frontend demo.");
  };

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-5 py-12 text-[#171717]">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/account"
          className="text-xs font-semibold tracking-wider text-gray-500 hover:text-black"
        >
          ← BACK TO ACCOUNT
        </Link>

        <div className="mt-8 border border-black/10 bg-white p-7 sm:p-10">
          <p className="text-[10px] font-semibold tracking-[3px] text-[#8b9275]">
            PERSONAL INFORMATION
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            My Profile
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Manage your personal details.
          </p>

          <form onSubmit={handleSubmit} className="mt-9 space-y-6">

            <div>
              <label className="mb-2 block text-xs font-semibold">
                FULL NAME
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold">
                PHONE NUMBER
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#171717] py-4 text-xs font-semibold tracking-[2px] text-white transition hover:bg-[#8b9275] sm:w-auto sm:px-10"
            >
              SAVE CHANGES
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}
