
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

type Address = {
  id: number;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault: boolean;
};

export default function AddressesPage() {
  const { addresses, setAddresses } = useCart();
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newAddress: Address = {
      id: Date.now(),
      ...form,
      isDefault: addresses.length === 0,
    };

    setAddresses((prev) => [...prev, newAddress]);

    setForm({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      pinCode: "",
    });

    setShowForm(false);
  };

  const removeAddress = (id: number) => {
    setAddresses((prev) =>
      prev
        .filter((address) => address.id !== id)
        .map((address, index) => ({
          ...address,
          isDefault: index === 0 ? true : address.isDefault,
        }))
    );
  };

  const setDefaultAddress = (id: number) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  return (
    <main className="min-h-screen bg-[#f8f7f3] px-5 py-12 text-[#171717]">
      <div className="mx-auto max-w-4xl">

        <Link
          href="/account"
          className="text-xs font-semibold tracking-wider text-gray-500 hover:text-black"
        >
          ← BACK TO ACCOUNT
        </Link>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold tracking-[3px] text-[#8b9275]">
              DELIVERY INFORMATION
            </p>

            <h1 className="mt-3 text-3xl font-semibold">
              Saved Addresses
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage your delivery locations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="bg-[#171717] px-5 py-3 text-xs font-semibold tracking-wider text-white transition hover:bg-[#8b9275]"
          >
            {showForm ? "CANCEL" : "+ ADD NEW ADDRESS"}
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={addAddress}
            className="mt-8 space-y-5 border border-black/10 bg-white p-6 sm:p-8"
          >
            <h2 className="text-lg font-semibold">New Address</h2>

            {[
              { name: "fullName", label: "FULL NAME", placeholder: "Enter full name" },
              { name: "phone", label: "PHONE NUMBER", placeholder: "10-digit mobile number" },
              { name: "street", label: "STREET ADDRESS", placeholder: "House number, street, area" },
              { name: "city", label: "CITY", placeholder: "Enter city" },
              { name: "state", label: "STATE", placeholder: "Enter state" },
              { name: "pinCode", label: "PIN CODE", placeholder: "6-digit PIN code" },
            ].map((field) => (
              <div key={field.name}>
                <label className="mb-2 block text-xs font-semibold">
                  {field.label}
                </label>

                <input
                  required
                  name={field.name}
                  value={form[field.name as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#8b9275]"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#171717] py-4 text-xs font-semibold tracking-wider text-white transition hover:bg-[#8b9275]"
            >
              SAVE ADDRESS
            </button>
          </form>
        )}

        <div className="mt-8 space-y-4">
          {addresses.length === 0 && !showForm && (
            <div className="border border-black/10 bg-white px-6 py-14 text-center">
              <h2 className="text-lg font-semibold">
                No saved addresses yet
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Add an address to make future checkouts easier.
              </p>
            </div>
          )}

          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-black/10 bg-white p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-semibold">{address.fullName}</h3>

                {address.isDefault && (
                  <span className="bg-[#eef0e8] px-3 py-1 text-[10px] font-semibold tracking-wider text-[#697052]">
                    DEFAULT
                  </span>
                )}
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {address.street}, {address.city}, {address.state} - {address.pinCode}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Phone: {address.phone}
              </p>

              <div className="mt-5 flex flex-wrap gap-4">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(address.id)}
                    className="text-xs font-semibold underline underline-offset-4"
                  >
                    SET AS DEFAULT
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removeAddress(address.id)}
                  className="text-xs font-semibold text-red-600 underline underline-offset-4"
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
