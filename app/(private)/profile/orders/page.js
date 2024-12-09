"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FormatPrice from "@/helper/FormatPrice";
import Sidebar from "@/components/layouts/Sidebar";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/profile/orders");
        setOrders(response.data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchOrders();
    }
  }, [session]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <section className="py-10">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Sidebar />
          <main className="md:w-2/3 lg:w-3/4 px-4">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">My Orders</h2>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No orders found</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {order.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.picture}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {product.quantity}
                              </p>
                            </div>
                          </div>
                          <FormatPrice
                            price={product.price * product.quantity}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total:</span>
                        <FormatPrice price={order.totalAmount} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default OrdersPage;
