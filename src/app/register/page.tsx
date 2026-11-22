"use client";

import Link from "next/link";
import { useState } from "react";
export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");
const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");

  if (!fullName.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
    setError("Please fill in all fields.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    setError("Please enter a valid 10-digit phone number.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  alert("Registration successful! Account creation will be enabled after backend integration.");
};
  return (
    <main className="min-h-screen bg-[#f8f7f3] px-5 py-12 text-[#171717]">
      <div className="mx-auto max-w-md">

        {/* Logo */}
        <Link
          href="/"
          className="block text-center text-3xl font-black tracking-[-2px]"
        >
          FASHION<span className="text-[#8b9275]">.</span>CART
        </Link>

        {/* Registration Card */}
        <div className="mt-12 border border-black/10 bg-white p-7 sm:p-10">

          <div className="text-center">
            <p className="text-[10px] font-semibold tracking-[3px] text-[#8b9275]">
              JOIN FASHION CART
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Create your account
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              Create an account for a more personal shopping experience.
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="mt-9 space-y-5">
{error && (
  <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
    {error}
  </p>
)}
            <div>
              <label className="mb-2 block text-xs font-semibold">
                FULL NAME
              </label>
              <input
  type="text"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  placeholder="Enter your full name"
  required
  className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#8b9275]"
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
  placeholder="you@example.com"
  required
  className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#8b9275]"
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
  placeholder="Enter your 10-digit mobile number"
  required
  maxLength={10}
  className="w-full border border-gray-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-[#8b9275]"
/>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold">
                PASSWORD
              </label>
              <div className="flex border border-gray-300 focus-within:border-[#8b9275]">
  <input
  type={showPassword ? "text" : "password"}
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Create a password"
  required
  minLength={8}
  className="w-full bg-transparent px-4 py-3 text-sm outline-none"
/>

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="px-4 text-xs font-semibold text-gray-500"
  >
    {showPassword ? "HIDE" : "SHOW"}
  </button>
</div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold">
                CONFIRM PASSWORD
              </label>
              <div className="flex border border-gray-300 focus-within:border-[#8b9275]">
  <input
  type={showConfirmPassword ? "text" : "password"}
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  placeholder="Confirm your password"
  required
  minLength={8}
  className="w-full bg-transparent px-4 py-3 text-sm outline-none"
/>

  <button
    type="button"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    className="px-4 text-xs font-semibold text-gray-500"
  >
    {showConfirmPassword ? "HIDE" : "SHOW"}
  </button>
</div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#171717] py-4 text-xs font-semibold tracking-[2px] text-white transition hover:bg-[#8b9275]"
            >
              CREATE ACCOUNT
            </button>

          </form>

          {/* Google Registration UI */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-[10px] tracking-widest text-gray-400">
              OR
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          
<button
  type="button"
  onClick={() =>
    alert("Google Sign-Up will be enabled after OAuth integration.")
  }
  className="flex w-full items-center justify-center gap-3 border border-gray-300 bg-white py-3 text-sm font-medium transition hover:border-black hover:bg-gray-50"
>
  <svg
    width="19"
    height="19"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path fill="#4285F4" d="M43.6 24.5c0-1.5-.1-3-.4-4.5H24v8.5h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15.3Z"/>
    <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"/>
    <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"/>
    <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.9-5.9C34.1 6 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3c1.6-4.8 6.1-8.3 11.4-8.3Z"/>
  </svg>

  Sign up with Google
</button>


          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#171717] underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>

        </div>

        <Link
          href="/"
          className="mt-7 block text-center text-xs tracking-wider text-gray-500 hover:text-black"
        >
          ← BACK TO SHOP
        </Link>

      </div>
    </main>
  );
}
