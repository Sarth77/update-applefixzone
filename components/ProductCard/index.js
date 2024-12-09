import FormatPrice from "@/helper/FormatPrice";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../Buttons/AddToCart";

const ProductCard = ({ product }) => {
  // Debug logs
  console.log("ProductCard received:", product);

  if (!product) {
    console.log("No product data received");
    return null;
  }

  // Ensure description exists and is a string
  const description = product.description || "No description available";
  console.log("Product description:", description);

  return (
    <div className="w-52 flex flex-col" key={product.id}>
      <Link href={`/products/${product.id}`}>
        <div className="bg-blue-100 p-5 h-52 rounded-xl overflow-hidden relative flex items-center justify-center">
          <Image
            width={208}
            height={208}
            src={product.picture || "/placeholder.jpg"}
            alt={product.name || "Product Image"}
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
        <div className="mt-2">
          <h3 className="font-bold capitalize truncate">
            {product.name || "Unnamed Product"}
          </h3>
        </div>
        <p className="text-sm mt-1 leading-4 text-gray-500 h-20">
          {description.length > 90
            ? `${description.slice(0, 90)}...Read More`
            : description}
        </p>
      </Link>
      <div className="flex">
        <div className="text-2xl font-bold grow flex gap-3">
          <h3>
            <FormatPrice price={product.price || 0} />
          </h3>
        </div>
        <AddToCart product={product} name={"+"} />
      </div>
    </div>
  );
};

export default ProductCard;
