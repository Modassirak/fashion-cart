"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Checkout() {
  const {
    cart,
    setCart,
    orders,
  setOrders,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useCart();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const [streetAddress, setStreetAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const cartSubtotal = cart.reduce((total, item) => {
    const price =
      Number(String(item.price).replace(/[^\d.]/g, "")) || 0;

    return total + price * (item.quantity || 1);
  }, 0);
const validateCheckout = () => {
  const errors: string[] = [];

  if (!customerName.trim()) {
    errors.push("Full name is required.");
  }

  if (!customerEmail.trim()) {
    errors.push("Email address is required.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    errors.push("Please enter a valid email address.");
  }

  if (!customerPhone.trim()) {
    errors.push("Phone number is required.");
  } else if (!/^[6-9]\d{9}$/.test(customerPhone.trim())) {
    errors.push("Please enter a valid 10-digit Indian mobile number.");
  }

  if (!streetAddress.trim()) {
    errors.push("Street address is required.");
  }

  if (!city.trim()) {
    errors.push("City is required.");
  }

  if (!state.trim()) {
    errors.push("State is required.");
  }

  if (!/^\d{6}$/.test(pinCode.trim())) {
    errors.push("Please enter a valid 6-digit PIN code.");
  }

  setFormErrors(errors);

  return errors.length === 0;
};
const handleContinueShopping = () => {
  setCart([]);
  setIsOrderPlaced(false);
  setIsCheckoutOpen(false);

  setPaymentMethod("cod");

  setCustomerName("");
  setCustomerEmail("");
  setCustomerPhone("");

  setStreetAddress("");
  setLandmark("");
  setCity("");
  setState("");
  setPinCode("");

  setFormErrors([]);
};

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#f8f7f3] overflow-y-auto">
      {/* Checkout Header */}
<div className="bg-white border-b border-black/10 px-6 py-5">
  <div className="max-w-[1200px] mx-auto flex items-center justify-between">
    <h1 className="text-2xl font-black tracking-tight">
      FASHION<span className="text-[#8b9275]">.</span>CART
    </h1>

    <button
      onClick={() => setIsCheckoutOpen(false)}
      className="text-sm tracking-widest text-gray-500 hover:text-black"
    >
      CONTINUE SHOPPING ✕
    </button>
  </div>
</div>
{/* Order Confirmation */}
{isOrderPlaced && (
  <div className="fixed inset-0 z-[250] bg-white flex items-center justify-center px-6">
    <div className="max-w-lg w-full text-center">

      <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <p className="text-xs tracking-[4px] text-gray-400 mb-4">
        FASHION CART
      </p>

      <h2 className="text-3xl font-semibold mb-4">
        THANK YOU!
      </h2>

      <p className="text-gray-500 text-sm leading-7 mb-8">
        Your demo order has been successfully placed.
        We appreciate your shopping with us.
      </p>

      <div className="bg-[#f8f7f3] p-6 mb-8">
        <p className="text-xs tracking-widest text-gray-500 mb-2">
          ORDER REFERENCE
        </p>

        <p className="text-xl font-semibold tracking-wider">
          FC-2026-DEMO
        </p>

        <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">
          <span className="text-sm text-gray-500">
            Order Total
          </span>

          <span className="font-semibold">
            ₹{(
              cartSubtotal + (cartSubtotal >= 500 ? 0 : 99)
            ).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <button
        onClick={handleContinueShopping}
        className="w-full bg-black text-white py-4 text-xs font-semibold tracking-[2px] hover:bg-[#333333] transition-colors"
      >
        CONTINUE SHOPPING
      </button>

    </div>
  </div>
)}
{isCheckoutOpen && (
  <div className="fixed inset-0 z-[200] bg-[#f8f7f3] overflow-y-auto">

    {/* Checkout Header */}
    <div className="bg-white border-b border-black/10 px-6 py-5">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">

        <h1 className="text-2xl font-black tracking-tight">
          FASHION<span className="text-[#8b9275]">.</span>CART
        </h1>

        <button
          onClick={() => setIsCheckoutOpen(false)}
          className="text-sm tracking-widest text-gray-500 hover:text-black"
        >
          CONTINUE SHOPPING ✕
        </button>

      </div>
    </div>


{/* Order Confirmation */}
{isOrderPlaced && (
  <div className="fixed inset-0 z-[250] bg-white flex items-center justify-center px-6">

    <div className="max-w-lg w-full text-center">

      <div className="mx-auto mb-8 w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>

      <p className="text-xs tracking-[4px] text-gray-400 mb-4">
        FASHION CART
      </p>

      <h2 className="text-3xl font-semibold mb-4">
        THANK YOU!
      </h2>

      <p className="text-gray-500 text-sm leading-7 mb-8">
        Your demo order has been successfully placed.
        We appreciate your shopping with us.
      </p>

      <div className="bg-[#f8f7f3] p-6 mb-8">
        <p className="text-xs tracking-widest text-gray-500 mb-2">
          ORDER REFERENCE
        </p>

        <p className="text-xl font-semibold tracking-wider">
          FC-2026-DEMO
        </p>

        <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">
          <span className="text-sm text-gray-500">
            Order Total
          </span>

          <span className="font-semibold">
            ₹{(
              cartSubtotal + (cartSubtotal >= 500 ? 0 : 99)
            ).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <button
        onClick={() => {
          setCart([]);
          setIsOrderPlaced(false);  
          setIsCheckoutOpen(false);
          setPaymentMethod("cod");
          setCustomerName("");
          setCustomerEmail("");
          setCustomerPhone("");

          setStreetAddress("");
          setLandmark("");
          setCity("");
          setState("");
          setPinCode("");

          setFormErrors([]);
        }}
        className="w-full bg-black text-white py-4 text-xs font-semibold tracking-[2px] hover:bg-[#333333] transition-colors"
      >
        CONTINUE SHOPPING
      </button>

    </div>
  </div>
)}

    {/* Checkout Content */}
    <div className="max-w-[1200px] mx-auto px-6 py-12">

      <h2 className="text-3xl font-semibold tracking-tight mb-2">
        CHECKOUT
      </h2>

      <p className="text-sm text-gray-500 mb-10">
        Complete your details to place your order.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Customer Information */}
        <div className="lg:col-span-2 space-y-10">

          {/* Contact Details */}
          <section className="bg-white p-6 md:p-8">
            <h3 className="text-lg font-semibold mb-6">
              01. CONTACT INFORMATION
            </h3>

            <div className="space-y-5">

              <div>
                <label className="block text-xs font-medium mb-2">
                  FULL NAME
                </label>
                <input
                    type="text"
  value={customerName}
  onChange={(e) => setCustomerName(e.target.value)}
  placeholder="Enter your full name"
  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
/>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-xs font-medium mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
/>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2">
                    PHONE NUMBER
                  </label>
                  <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
/>
                </div>

              </div>
            </div>
          </section>

          {/* Shipping Address */}
          <section className="bg-white p-6 md:p-8">

            <h3 className="text-lg font-semibold mb-6">
              02. SHIPPING ADDRESS
            </h3>

            <div className="space-y-5">

              <div>
                <label className="block text-xs font-medium mb-2">
                  STREET ADDRESS
                </label>
                <input
                  type="text"
                  placeholder="House number, street name"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-2">
                  APARTMENT / LANDMARK (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="Apartment, suite, landmark"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-xs font-medium mb-2">
                    CITY
                  </label>
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}

                    className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2">
                    STATE
                  </label>
                  <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                  />
                </div>

              </div>

              <div>
                <label className="block text-xs font-medium mb-2">
                  PIN CODE
                </label>
                <input
                  type="text"
                  placeholder="6-digit PIN code"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                />
              </div>

            </div>
          </section>

          
{/* Payment Method */}
<section className="bg-white p-6 md:p-8">

  <h3 className="text-lg font-semibold mb-6">
    03. PAYMENT METHOD
  </h3>

  <div className="space-y-4">

    {/* Cash on Delivery */}
    <label className="flex items-center gap-4 border p-5 cursor-pointer hover:border-black transition-colors">
      <input
        type="radio"
        name="payment"
        value="cod"
        checked={paymentMethod === "cod"}
        onChange={() => setPaymentMethod("cod")}
        className="accent-black"
      />

      <div>
        <p className="text-sm font-semibold">
          Cash on Delivery
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Pay when your order arrives.
        </p>
      </div>
    </label>

    {/* UPI */}
    <label className="flex items-center gap-4 border p-5 cursor-pointer hover:border-black transition-colors">
      <input
        type="radio"
        name="payment"
        value="upi"
        checked={paymentMethod === "upi"}
        onChange={() => setPaymentMethod("upi")}
        className="accent-black"
      />

      <div>
        <p className="text-sm font-semibold">
          UPI Payment
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Google Pay, PhonePe, Paytm and more.
        </p>
      </div>
    </label>

    {/* Card */}
    <label className="flex items-center gap-4 border p-5 cursor-pointer hover:border-black transition-colors">
      <input
        type="radio"
        name="payment"
        value="card"
        checked={paymentMethod === "card"}
        onChange={() => setPaymentMethod("card")}
        className="accent-black"
      />

      <div>
        <p className="text-sm font-semibold">
          Credit / Debit Card
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Pay securely using your card.
        </p>
      </div>
    </label>

  </div>
</section>


        </div>

        {/* Order Summary */}
        <div>
          <section className="bg-white p-6 md:p-8 sticky top-6">

            <h3 className="text-lg font-semibold mb-6">
              YOUR ORDER
            </h3>

            <div className="space-y-5">

              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-b border-gray-100 pb-5"
                >

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Quantity: {item.quantity || 1}
                    </p>

                    <p className="text-sm mt-2">
                      ₹{(
                        (Number(String(item.price).replace(/[^\d.]/g, "")) || 0) *
                        (item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>
              ))}

            </div>

            <div className="space-y-4 mt-6 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>
                  ₹{cartSubtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span>
                  {cartSubtotal >= 500
                    ? "FREE"
                    : "₹99"}
                </span>
              </div>

              <div className="border-t pt-5 flex justify-between font-semibold text-base">
                <span>TOTAL</span>
                <span>
                  ₹{(
                    cartSubtotal + (cartSubtotal >= 500 ? 0 : 99)
                  ).toLocaleString("en-IN")}
                </span>
              </div>

            </div>

            <p className="text-xs text-gray-400 mt-6 leading-5">
              Shipping and taxes are calculated based on your order.
            </p>
            {formErrors.length > 0 && (
  <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-4">
    <p className="text-sm font-semibold text-red-700 mb-2">
      Please fix the following errors:
    </p>

    <ul className="list-disc pl-5 space-y-1">
      {formErrors.map((error, index) => (
        <li key={index} className="text-xs text-red-600">
          {error}
        </li>
      ))}
    </ul>
  </div>
)}
            
<button
  onClick={() => {
  if (validateCheckout()) {
  const newOrder = {
    id: `FC-${Date.now()}`,
    date: new Date().toLocaleString("en-IN"),
    items: cart.map((item) => ({ ...item })),
    total: cartSubtotal,
    status: "Order Placed",
    customer: {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: streetAddress,
      city,
      state,
      pinCode,
    },
    paymentMethod,
  };

  setOrders((previousOrders) => [newOrder, ...previousOrders]);

  setIsOrderPlaced(true);
}
}}
  disabled={cart.length === 0}
  className="w-full mt-6 bg-black text-white py-4 text-xs font-semibold tracking-[2px] hover:bg-[#333333] disabled:opacity-50 transition-colors"
>
  PLACE ORDER
</button>

<p className="text-center text-xs text-gray-400 mt-4">
  By placing your order, you agree to our terms and conditions.
</p>


          </section>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}