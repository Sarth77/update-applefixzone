import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/firebase/products";
import { Suspense } from "react";
import Loading from "./loading";

const Products = async () => {
  let products = [];

  try {
    products = await getProducts();
    console.log("Fetched products:", products); // Debug log
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <Suspense fallback={<Loading />}>
      <section className="bg-[#fff]">
        <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
          <h1 className="text-black text-2xl font-semibold font-sans mb-4">
            All Products
          </h1>
          <div className="card-grid my-[2em] mx-0 grid gap-12 grid-cols-autofill place-items-center place-content-center">
            {products &&
              products.map((product) => (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Products;
