
"use client";

import Link from "next/link";
import { useState } from "react";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword.length < 8) {
      alert("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match.");
      return;
    }

    alert("Password change is currently a frontend demo.");
  };

  return (
    <main className="min-h-screen bg-[#faf9f6] px-6 py-12">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/account/settings"
          className="text-sm text-gray-500 hover:text-black"
        >
          ← Back to Account Settings
        </Link>

        <p className="mt-8 text-xs tracking-[4px] text-gray-500">
          FASHION CART
        </p>

        <h1 className="mt-3 text-4xl font-serif text-[#202019]">
          Change Password
        </h1>

        <p className="mt-3 text-sm text-gray-500">
          Keep your account secure with a strong password.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6 border border-gray-200 bg-white p-6 sm:p-8"
        >

          <div>
            <label className="text-sm font-medium">
              Current Password
            </label>

            <div className="mt-2 flex border border-gray-200">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm outline-none"
                placeholder="Enter current password"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="px-4 text-xs font-semibold text-gray-500"
              >
                {showCurrent ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">
              New Password
            </label>

            <div className="mt-2 flex border border-gray-200">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 text-sm outline-none"
                placeholder="Enter new password"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="px-4 text-xs font-semibold text-gray-500"
              >
                {showNew ? "HIDE" : "SHOW"}
              </button>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              Use at least 8 characters.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium">
              Confirm New Password
            </label>

            <div className="mt-2 flex border border-gray-200">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 text-sm outline-none"
                placeholder="Confirm new password"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="px-4 text-xs font-semibold text-gray-500"
              >
                {showConfirm ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black px-6 py-4 text-xs font-semibold tracking-widest text-white transition hover:bg-gray-800"
          >
            UPDATE PASSWORD
          </button>

        </form>

      </div>
    </main>
  );
}
