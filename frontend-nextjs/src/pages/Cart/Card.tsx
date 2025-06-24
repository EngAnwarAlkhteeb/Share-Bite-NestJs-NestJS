"use client";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/context/StoreContext";
import "./Cart.css";

const Cart = () => {
  const context = useContext(StoreContext);
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  if (!context) return <div>Loading...</div>;

  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
  } = context;

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2;
  const subtotal = getTotalCartAmount();
  const total = subtotal + deliveryFee - discount;

  const handlePromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const cartItemsArray = food_list.filter((item) => cartItems[item._id] > 0);

  if (cartItemsArray.length === 0) {
    return (
      <div className="cart">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <button onClick={() => router.push("/")}>Browse Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {cartItemsArray.map((item) => (
          <div key={item._id}>
            <div className="cart-items-title cart-items-item">
              <Image
                src={
                  typeof item.image === "string"
                    ? item.image
                    : "/src/assets/food_1.png"
                }
                alt={item.name}
                width={50}
                height={50}
              />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <div className="cart-quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  -
                </button>
                <p>{cartItems[item._id]}</p>
                <button
                  className="quantity-btn"
                  onClick={() => addToCart(item._id)}
                >
                  +
                </button>
              </div>
              <p>${(item.price * cartItems[item._id]).toFixed(2)}</p>
              <p
                className="cross"
                onClick={() => {
                  for (let i = 0; i < cartItems[item._id]; i++) {
                    removeFromCart(item._id);
                  }
                }}
              >
                x
              </p>
            </div>
            <hr />
          </div>
        ))}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${deliveryFee.toFixed(2)}</p>
            </div>
            <hr />
            {discount > 0 && (
              <>
                <div className="cart-total-details">
                  <p>Discount</p>
                  <p>-${discount.toFixed(2)}</p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <b>Total</b>
              <b>${total.toFixed(2)}</b>
            </div>
          </div>
          <button onClick={() => router.push("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>

        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className="cart-promocode-input">
            <input
              type="text"
              placeholder="promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button onClick={handlePromoCode}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
