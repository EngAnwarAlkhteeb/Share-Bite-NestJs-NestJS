// src/components/OrderList.jsx
import React, { useState, useEffect } from 'react';
import { fetchGraphQL } from '@/lib/fetchGraphQL';
import { print } from 'graphql';
import { gql } from 'graphql-tag';

// Define the GraphQL query to fetch all orders
const GET_ALL_ORDERS_QUERY = gql`
  query GetAllOrders {
    orders { 
      id
      userId
      orderDate
      price
      totalAmount
      
      user {
        id
        username
        email
      }
      
      orderItems { 
        id
        quantity
        price
        food {
          id
          name
          price
          description
        }
      }
    }
  }
`;

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await fetchGraphQL(print(GET_ALL_ORDERS_QUERY), {});

                if (response.data && response.data.orders) {
                    setOrders(response.data.orders);
                } else {
                    setOrders([]);
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
                setError(err.message || 'Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p className="text-center py-8">Loading orders...</p>;
    if (error) return <p className="text-center py-8 text-red-600">Error loading orders: {error}</p>;
    if (!orders || orders.length === 0) return <p className="text-center py-8 text-gray-600">No orders found.</p>;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">All Orders</h2>
            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">Order #{order.id}</h3>
                                <p className="text-gray-600">
                                    Ordered by: {order.user ? `${order.user.username} (${order.user.email})` : 'N/A'}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    Date: {new Date(order.orderDate).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-green-600">${order.totalAmount || order.price}</p>
                                <p className="text-sm text-gray-500">Total Amount</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <h4 className="text-lg font-semibold text-gray-800 mb-3">Order Items:</h4>
                            <div className="space-y-2">
                                {order.orderItems && order.orderItems.length > 0 ? (
                                    order.orderItems.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                                            <div>
                                                <span className="font-medium text-gray-800">
                                                    {item.food ? item.food.name : 'Unknown Food'}
                                                </span>
                                                {item.food && item.food.description && (
                                                    <p className="text-sm text-gray-600">{item.food.description}</p>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-800">Qty: {item.quantity}</p>
                                                <p className="text-sm text-gray-600">${item.price} each</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 italic">No items found for this order</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default OrderList;

