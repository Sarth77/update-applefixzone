"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaBagShopping } from "react-icons/fa6";
import axios from "axios";

const Cart = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    if (status === "authenticated" && session?.user?.id) {
      try {
        const response = await axios.get("/api/cart/getCart", {
          headers: {
            Authorization: session.accessToken,
          },
        });

        // Calculate total items in cart
        const products = response.data.data || [];
        const count = products.reduce((total, item) => {
          return total + (item.quantity || 1);
        }, 0);

        setCartCount(count);
        // Trigger a page refresh when cart count changes
        router.refresh();
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(0);
      }
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Set up an interval to refresh the cart count
    const interval = setInterval(fetchCartCount, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [session, status]);

  const movingToCart = () => {
    router.push("/cart");
    router.refresh();
  };

  return (
    <div
      onClick={movingToCart}
      className="relative select-none focus-none outline-none cursor-pointer"
      title="Shopping Cart"
    >
      <FaBagShopping className="select-none focus-none outline-none text-xl" />
      {cartCount > 0 && (
        <span className="absolute flex top-[-45%] right-[-30%] w-[15px] h-[15px] rounded-full items-center justify-center text-[0.8rem] font-bold text-white bg-black select-none">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default Cart;
