import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { print } from "graphql";
import { gql } from "graphql-tag";
import Image from "next/image";
import './MyOrders.css';

const GET_ORDERS_BY_USER_QUERY = gql`
  query GetOrdersByUser($userId: Int!) {
    ordersByUser(userId: $userId) {
      id
      userId
      orderDate
      price
      totalAmount
      address
      orderItems {
        id
        quantity
        price
        food {
          id
          name
          image
        }
      }
    }
  }
`;

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!token) {
      setError("Please login to view your orders.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // TODO: Get actual user ID from token/context
      const userId = 1; // Placeholder - implement proper user ID extraction

      const response = await fetchGraphQL(print(GET_ORDERS_BY_USER_QUERY), {
        userId: userId,
      }, token);

      if (response.data && response.data.ordersByUser) {
        setOrders(response.data.ordersByUser);
      } else {
        setOrders([]);
        console.error("GraphQL Errors:", response.errors);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">No Orders Found</h2>
          <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center">
            My Orders
          </h1>

          <div className="space-y-6">
            {orders.map((order) => {
              const parsedAddress = order.address ? JSON.parse(order.address) : {};

              return (
                <div key={order.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Order #{order.id}</h3>
                      <p className="text-gray-600">
                        Ordered on: {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                      {parsedAddress.firstName && (
                        <p className="text-gray-600 text-sm">
                          Delivery to: {parsedAddress.firstName} {parsedAddress.lastName}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${order.totalAmount}</p>
                      <p className="text-sm text-gray-500">Total Amount</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Items:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 bg-white rounded-lg p-3">
                          <Image
                            src={item.food?.image || "/src/assets/food_1.png"}
                            alt={item.food?.name || "Food Item"}
                            width={50}
                            height={50}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">
                              {item.food?.name || "Unknown Food"}
                            </p>
                            <p className="text-gray-600 text-xs">
                              Qty: {item.quantity} × ${item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="text-green-600 font-medium">Order Confirmed</span>
                    </div>
                    <button
                      onClick={() => window.location.href = `/order-success/${order.id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;

