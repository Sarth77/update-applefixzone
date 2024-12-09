"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

import ButtonLoader from "@/components/ButtonLoader";
import { Button } from "@/components/ui/button";

const ClearCart = ({ name }) => {
  const [isloading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const clearAllCart = async () => {
    if (status === "unauthenticated") {
      return router.push("/signin");
    }

    setIsLoading(true);
    const id = toast.loading("Clearing cart...");

    try {
      const response = await axios.delete("/api/cart/clearCart", {
        headers: {
          Authorization: session?.accessToken,
        },
      });

      if (response.data.success) {
        toast.success("Cart cleared successfully!", { id });
        router.refresh();
      } else {
        throw new Error(response.data.message || "Failed to clear cart");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error(error.response?.data?.message || "Failed to clear cart", {
        id,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={status === "loading" || isloading}
      size="sm"
      onClick={clearAllCart}
      className="disabled:cursor-not-allowed disabled:bg-red-300 font-semibold hover:bg-red-500 text-white bg-red-400 hover:text-white text-xs cursor-pointer px-3 py-2 rounded-md drop-shadow-md mb-3"
    >
      {status === "loading" || isloading ? <ButtonLoader /> : name}
    </Button>
  );
};

export default ClearCart;
