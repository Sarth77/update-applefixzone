import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

const EmptySearch = ({ name, error = false }) => {
  return (
    <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
      <h1 className="text-black text-2xl font-semibold font-sans mb-4">
        {name.length > 20
          ? `Search Results for: ${name.slice(0, 20)}...`
          : `Search Results for: ${name}`}
      </h1>
      <div className="snap-start max-w-[90%] m-auto flex flex-col gap-4 items-center justify-center">
        <div className="min-h-[30vh] flex flex-col items-center justify-center">
          <p>
            {error
              ? "An error occurred while searching. Please try again."
              : name
              ? "No products found matching your search."
              : "Please enter a search term."}
          </p>
          <div>
            <Link href="/products">
              <div className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-1 mt-4">
                <BiArrowBack />
                Browse all products
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptySearch;
