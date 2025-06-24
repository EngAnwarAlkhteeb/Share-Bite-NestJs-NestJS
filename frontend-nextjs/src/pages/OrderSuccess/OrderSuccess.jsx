import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "@/context/StoreContext";
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { print } from "graphql";
import { gql } from "graphql-tag";
import Image from "next/image";
import { useRouter } from "next/navigation";

const GET_ORDER_BY_ID_QUERY = gql`
  query GetOrderById($id: Int!) {
    order(id: $id) {
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

interface OrderSuccessProps {
  orderId: string;
}

const OrderSuccess: React.FC<OrderSuccessProps> = ({ orderId }) => {
  const { token } = useContext(StoreContext);
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!token) {
        router.push("/auth"); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetchGraphQL(print(GET_ORDER_BY_ID_QUERY), {
          id: parseInt(orderId),
        }, token);

        if (response.data && response.data.order) {
          setOrder(response.data.order);
        } else {
          setError("Order not found or an error occurred.");
          console.error("GraphQL Errors:", response.errors);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch order details.");
        console.error("Network Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, token, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <p className="text-xl text-gray-700">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <p className="text-xl text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <p className="text-xl text-gray-700">Order not found.</p>
      </div>
    );
  }

  const parsedAddress = order.address ? JSON.parse(order.address) : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <Image
            src="/src/assets/order-success-icon.png" // You might want to generate a 3D success icon
            alt="Order Success"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h1 className="text-5xl font-extrabold text-green-600 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-700 text-lg">
            Your order <span className="font-bold">#{order.id}</span> has been confirmed.
          </p>
          <p className="text-gray-600 mt-2">
            You will receive an email confirmation shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-green-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Order Details</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Total Amount:</span> ${order.totalAmount.toFixed(2)}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Payment Status:</span> Paid (Assumed)
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Delivery Address</h2>
            <p className="text-gray-700">
              {parsedAddress.firstName} {parsedAddress.lastName}
            </p>
            <p className="text-gray-700">{parsedAddress.street}</p>
            <p className="text-gray-700">
              {parsedAddress.city}, {parsedAddress.state} {parsedAddress.zipcode}
            </p>
            <p className="text-gray-700">{parsedAddress.country}</p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> {parsedAddress.phone}
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Items Ordered</h2>
          <div className="space-y-4">
            {order.orderItems.map((item: any) => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
                <Image
                  src={item.food?.image || "/src/assets/food_1.png"}
                  alt={item.food?.name || "Food Item"}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.food?.name || "Unknown Food"}</p>
                  <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-gray-800">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/myorders")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;


