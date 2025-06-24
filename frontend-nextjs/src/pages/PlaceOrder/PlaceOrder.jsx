"use client";

import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useRouter } from "next/navigation";
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { print } from "graphql";
import { gql } from "graphql-tag";

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      id
      userId
      orderDate
      price
      totalAmount
      orderItems {
        id
        quantity
        price
        food {
          id
          name
        }
      }
    }
  }
`;

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems, clearCart } = useContext(StoreContext);
  const router = useRouter();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChangehandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!token) {
      alert("Please login to place an order.");
      router.push("/"); // Redirect to home page where they can sign in
      setIsLoading(false);
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({
          foodId: parseInt(item._id), // Assuming _id can be parsed to int for foodId
          quantity: cartItems[item._id],
          price: item.price,
        });
      }
    });

    if (orderItems.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      setIsLoading(false);
      return;
    }

    const createOrderInput = {
      userId: 1, // Placeholder: You need to get the actual user ID from the authenticated user
      orderDate: new Date().toISOString(),
      price: getTotalCartAmount(),
      totalAmount: getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2), // Assuming a fixed delivery fee of 2
      orderItems: orderItems,
      address: JSON.stringify(data), // Store address as a JSON string
    };

    try {
      const response = await fetchGraphQL(print(CREATE_ORDER_MUTATION), {
        createOrderInput: createOrderInput,
      }, token);

      if (response.data && response.data.createOrder) {
        alert("Order Placed Successfully!");
        clearCart();
        router.push(`/order-success/${response.data.createOrder.id}`);
      } else {
        console.error("Order placement failed:", response.errors);
        alert("Error placing order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/");
    } else if (getTotalCartAmount() === 0) {
      router.push("/cart");
    }
  }, [token, getTotalCartAmount, router]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangehandler} value={data.firstName} type="text" placeholder="First Name" />
          <input required name="lastName" onChange={onChangehandler} value={data.lastName} type="text" placeholder="Last Name" />
        </div>
        <input required name="email" onChange={onChangehandler} value={data.email} type="email" placeholder="Email Address" />
        <input required name="street" onChange={onChangehandler} value={data.street} type="text" placeholder="Street" />

        <div className="multi-fields">
          <input required name="city" onChange={onChangehandler} value={data.city} type="text" placeholder="City" />
          <input required name="state" onChange={onChangehandler} value={data.state} type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input required name="zipcode" onChange={onChangehandler} value={data.zipcode} type="text" placeholder="Zip Code" />
          <input required name="country" onChange={onChangehandler} value={data.country} type="text" placeholder="Country" />
        </div>
        <input required name="phone" onChange={onChangehandler} value={data.phone} type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
        <h2>Cart Totals</h2>
        <div className="place-order-right-total">
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </form>
  );
}

export default PlaceOrder;

