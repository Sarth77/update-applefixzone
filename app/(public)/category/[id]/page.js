import React, { Suspense } from "react";
import { getProductsByCategory } from "@/lib/firebase/category";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Loading from "./loading";

const CategoryPage = async ({ params }) => {
  const { id } = params;
  let products = [];

  try {
    products = await getProductsByCategory(id);
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  // Wrap the content in Suspense and provide a loading fallback
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold capitalize">{id} Products</h1>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              View All Products
            </Link>
          </div>

          {!products || products.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No products found in this category.
              </p>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
              >
                Browse all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="w-full">
                  {/* Add a null check for product description */}
                  <ProductCard
                    product={{
                      ...product,
                      description:
                        product.description || "No description available",
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default CategoryPage;
