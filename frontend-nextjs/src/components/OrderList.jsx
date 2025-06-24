// src/components/OrderList.jsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define the GraphQL query to fetch all orders
// IMPORTANT: Use 'orders' (plural) as per our fix
const GET_ALL_ORDERS_QUERY = gql`
  query GetAllOrders {
    orders { 
      id
      userId
      orderDate
      price
      totalAmount
      
      user { # Request nested user data
        id
        username
        email
      }
      
      orderItems { 
        id
        quantity
        price
        food { # Request nested food details for each item
          id
          name
          price
          description
          # Add other fields you want from the Food entity
        }
      }
    }
  }
`;

function OrderList() {
    // useQuery returns loading, error, and data states
    const { loading, error, data } = useQuery(GET_ALL_ORDERS_QUERY);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error loading orders: {error.message}</p>;
    if (!data || !data.orders || data.orders.length === 0) return <p>No orders found.</p>;

    return (
        <div>
            <h2>All Orders</h2>
            {data.orders.map((order) => (
                <div key={order.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>Order ID: {order.id}</h3>
                    <p>Ordered by: {order.user ? `${order.user.username} (${order.user.email})` : 'N/A'}</p>
                    <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
                    <p>Total Price: ${order.totalAmount}</p> {/* Use totalAmount from your DB */}
                    <p>Order-level Price: ${order.price}</p> {/* If you distinguish between total and order-level price */}

                    <h4>Items:</h4>
                    <ul>
                        {order.orderItems.map((item) => (
                            <li key={item.id}>
                                {item.food ? item.food.name : 'Unknown Food'} - Qty: {item.quantity} - Item Price: ${item.price}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default OrderList;