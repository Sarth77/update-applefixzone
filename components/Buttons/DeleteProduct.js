"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";

import ButtonLoader from "@/components/ButtonLoader";
import { Button } from "@/components/ui/button";

const DeleteProduct = ({ product, name }) => {
  const [isloading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const removeItem = async (product) => {
    if (status === "unauthenticated") {
      return router.push("/signin");
    }

    setIsLoading(true);
    const id = toast.loading("Removing item...");

    try {
      const response = await axios.delete(
        `/api/cart/deleteItem?productId=${product.id}`,
        {
          headers: {
            Authorization: session?.accessToken,
          },
        }
      );

      if (response.data.success) {
        setIsLoading(false);
        toast.success(`Product removed from cart!`, { id });
        router.refresh();
      } else {
        throw new Error(response.data.message || "Failed to remove product");
      }
    } catch (error) {
      console.error("Error removing product:", error);
      setIsLoading(false);
      toast.error(error.response?.data?.message || "Failed to remove product", {
        id,
      });
    }
  };

  return (
    <Button
      disabled={status === "loading" || isloading}
      size="sm"
      onClick={() => removeItem(product)}
      className="disabled:cursor-not-allowed disabled:bg-red-300 font-semibold hover:bg-red-500 text-white bg-red-400 hover:text-white text-xs cursor-pointer border border-1 py-1 rounded-md px-1"
    >
      {status === "loading" || isloading ? <ButtonLoader /> : name}
    </Button>
  );
};

export default DeleteProduct;
