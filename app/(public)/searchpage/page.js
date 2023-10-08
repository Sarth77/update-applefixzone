import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import ProductCard from "@/components/ProductCard"
import { getProducts } from "@/lib/firebase/products";


const SearchProducts = async ({ searchParams }) => {
    const check = searchParams.hasOwnProperty("query");
    const query = searchParams?.query;
    if (check && query.length < 25) {
        const products = await getProducts();
        const data = await products?.filter((val) => val?.name.toLowerCase().includes(query?.toLowerCase())) || [];
        return (
            <>
                {
                    data.length > 0 ?
                        <section className="bg-[#fff] max-w-[90%] mx-auto">
                            <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
                                <h1 className="text-black text-2xl font-semibold font-sans mb-4 capitalize">
                                    {`Search : ${query || ""}`}
                                </h1>
                                <div className="card-grid my-[2em] mx-0 grid gap-12 grid-cols-autofill place-items-center place-content-center">
                                    {
                                        data.map((val) => {
                                            return (
                                                <ProductCard key={val.id} {...val} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section> :
                        <EmptySearch name={query} />
                }
            </>
        )
    } else {
        return (
            <>
                <EmptySearch name={query || ""} />
            </>
        );
    }
};

export default SearchProducts;


const EmptySearch = ({ name }) => {
    return (
        <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
            <h1 className="text-black text-2xl font-semibold font-sans mb-4">
                {name.length > 20 ? ` Search : ${name.slice(0, 20)}...` : ` Search : ${name}`}
            </h1>
            <div className="snap-start max-w-[90%] m-auto flex flex-col gap-4 items-center justify-center">
                <div className="min-h-[30vh] flex flex-col items-center justify-center">
                    <p>Your search is empty !</p>
                    <div>
                        <Link href="/products">
                            <div className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center gap-1">
                                <BiArrowBack />
                                Go to products
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}