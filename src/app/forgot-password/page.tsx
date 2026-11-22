
"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-16">
      <div className="mx-auto max-w-md">

        <Link
          href="/login"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Sign In
        </Link>

        <div className="mt-12 border border-gray-200 bg-white p-8 sm:p-10">

          <p className="text-xs tracking-[4px] text-gray-500">
            FASHION CART
          </p>

          <h1 className="mt-5 text-3xl font-serif text-[#202019]">
            Forgot Password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Enter the email address associated with your account.
            We'll send you instructions to reset your password.
          </p>

          {submitted ? (
            <div className="mt-8 border border-[#dfe3d5] bg-[#f5f6f1] p-5">
              <h2 className="font-semibold text-[#424a32]">
                Request submitted
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                If an account exists for {email}, password reset
                instructions can be sent to that address.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8">

              <label className="text-sm font-medium">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="mt-2 w-full border border-gray-200 px-4 py-4 text-sm outline-none transition focus:border-[#8b9275]"
              />

              <button
                type="submit"
                className="mt-6 w-full bg-black px-6 py-4 text-xs font-semibold tracking-widest text-white transition hover:bg-gray-800"
              >
                SEND RESET INSTRUCTIONS
              </button>

            </form>
          )}

          <div className="mt-8 text-center">
            <Link
              href="/login"
              className="text-sm font-medium text-[#697052] hover:text-black"
            >
              Back to Sign In
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
