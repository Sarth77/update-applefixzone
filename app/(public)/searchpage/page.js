import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/firebase/products";
import EmptySearch from "@/components/EmptySearch";

const SearchProducts = async ({ searchParams }) => {
  const query = searchParams?.query?.toLowerCase();

  // If no query or query is too long, show empty state
  if (!query || query.length > 25) {
    return <EmptySearch name={query || ""} />;
  }

  try {
    // Get all products
    const products = await getProducts();

    // Filter products based on search query
    const filteredProducts =
      products?.filter((product) => {
        const name = product?.name?.toLowerCase() || "";
        const description = product?.description?.toLowerCase() || "";
        const category = product?.category?.toLowerCase() || "";

        return (
          name.includes(query) ||
          description.includes(query) ||
          category.includes(query)
        );
      }) || [];

    // If no products found after filtering
    if (filteredProducts.length === 0) {
      return <EmptySearch name={query} />;
    }

    // Show filtered products
    return (
      <section className="bg-[#fff] max-w-[90%] mx-auto">
        <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
          <h1 className="text-black text-2xl font-semibold font-sans mb-4 capitalize">
            {`Search Results for: ${query}`}
          </h1>
          <div className="card-grid my-[2em] mx-0 grid gap-12 grid-cols-autofill place-items-center place-content-center">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error searching products:", error);
    return <EmptySearch name={query} error={true} />;
  }
};

export default SearchProducts;
