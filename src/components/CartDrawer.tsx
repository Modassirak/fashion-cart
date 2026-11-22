"use client";

import { useCart } from "@/context/CartContext";


export default function CartDrawer() {
  const {
  cart,
  setCart,
  isCartOpen,
  setIsCartOpen,
  setIsCheckoutOpen,
} = useCart();

  const cartSubtotal = cart.reduce((total, item) => {
    const price = Number(String(item.price).replace(/[^\d.]/g, "")) || 0;
    return total + price * (item.quantity || 1);
  }, 0);
const freeShippingThreshold = 500;

const remainingForFreeShipping = Math.max(
  0,
  freeShippingThreshold - cartSubtotal
);

const shippingProgress = Math.min(
  100,
  (cartSubtotal / freeShippingThreshold) * 100
);

  return (
    <>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          {/* Shopping Cart Drawer */}
{isCartOpen && (
  <div className="fixed inset-0 z-[100]">

    {/* Background Overlay */}
    <div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setIsCartOpen(false)}
    ></div>

    {/* Cart Panel */}
    <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl flex flex-col">

      {/* Cart Header */}
      <div className="flex items-center justify-between px-8 py-7 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-semibold tracking-widest text-black">
            SHOPPING BAG
          </h2>
          <p className="text-xs text-gray-500 mt-1 tracking-wide">
            {cart.length} ITEMS IN YOUR BAG
          </p>
        </div>

        <button
          onClick={() => setIsCartOpen(false)}
          className="text-2xl text-gray-500 hover:text-black transition-colors"
        >
          ×
        </button>
      </div>

      {/* Cart Content */}
      {/* Free Shipping Progress */}
{cart.length > 0 && (
  <div className="border-b border-gray-200 px-8 py-5">
    {remainingForFreeShipping > 0 ? (
      <p className="mb-3 text-sm text-gray-600">
        You're only{" "}
        <span className="font-semibold text-black">
          ₹{remainingForFreeShipping.toLocaleString("en-IN")}
        </span>{" "}
        away from free shipping!
      </p>
    ) : (
      <p className="mb-3 text-sm font-semibold text-[#687653]">
        Congratulations! You've unlocked free shipping.
      </p>
    )}

    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full rounded-full bg-[#8b9275] transition-all duration-500"
        style={{ width: `${shippingProgress}%` }}
      />
    </div>
  </div>
)}
      <div className="flex-1 overflow-y-auto px-8 py-6">

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-4xl mb-5">🛍</p>
            <h3 className="text-lg font-semibold tracking-wide">
              YOUR BAG IS EMPTY
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Discover something you'll love.
            </p>

            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-7 bg-black text-white px-8 py-3 text-xs tracking-widest hover:bg-gray-800 transition-colors"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <div className="space-y-7">

            {cart.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 border-b border-gray-200 pb-7"
              >

                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-32 w-24 object-cover bg-gray-100"
                />


                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">

                  <div>
                    <h3 className="text-sm font-semibold tracking-wide text-black">
                      {item.name}
                    </h3>
                    {item.size && (
  <p className="mt-1 text-xs text-gray-500">
    Size: {item.size}
  </p>
)}
{item.color && (
  <p className="mt-1 text-xs text-gray-500">
    Colour: {item.color}
  </p>
)}

                    <p className="mt-2 text-sm text-gray-500">
                      {item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="mt-5 flex items-center justify-between">

                    <div className="flex items-center border border-gray-300">

                      {/* Decrease */}
                      <button
                        onClick={() =>
                          setCart((prevCart) =>
                            prevCart.map((cartItem, i) =>
                              i === index
                                ? {
                                    ...cartItem,
                                    quantity: Math.max(
                                      1,
                                      (cartItem.quantity || 1) - 1
                                    ),
                                  }
                                : cartItem
                            )
                          )
                        }
                        className="h-9 w-9 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        −
                      </button>

                      {/* Quantity */}
                      <span className="min-w-[35px] text-center text-sm font-medium">
                        {item.quantity || 1}
                      </span>

                      {/* Increase */}
                      <button
                        onClick={() =>
                          setCart((prevCart) =>
                            prevCart.map((cartItem, i) =>
                              i === index
                                ? {
                                    ...cartItem,
                                    quantity: (cartItem.quantity || 1) + 1,
                                  }
                                : cartItem
                            )
                          )
                        }
                        className="h-9 w-9 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>

                    </div>

                    {/* Remove Item */}
                    <button
                      onClick={() =>
                        setCart((prevCart) =>
                          prevCart.filter((_, i) => i !== index)
                        )
                      }
                      className="text-xs uppercase tracking-wider text-gray-400 hover:text-black transition-colors"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Cart Footer */}
      {cart.length > 0 && (
        <div className="border-t border-gray-200 px-8 py-6 bg-white">
          <div className="flex justify-between items-center mb-5">
  <span className="text-sm font-medium tracking-wide">
    SUBTOTAL
  </span>

  <span className="text-lg font-semibold">
    ₹{cartSubtotal.toLocaleString("en-IN")}
  </span>
</div>
          <p className="text-xs text-gray-500 text-center tracking-wide mb-5">
            SHIPPING AND TAXES CALCULATED AT CHECKOUT
          </p>

          <button
 onClick={() => {
  setIsCartOpen(false);
  setIsCheckoutOpen(true);
}}
  className="w-full bg-black text-white py-4 text-xs font-semibold tracking-[2px] hover:bg-[#333333] transition-colors"
>
  PROCEED TO CHECKOUT
</button>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-full mt-4 text-xs tracking-widest text-gray-500 hover:text-black transition-colors"
          >
            CONTINUE SHOPPING
          </button>

        </div>
      )}

    </div>
  </div>
)}
        </div>
      )}
    </>
  );
}