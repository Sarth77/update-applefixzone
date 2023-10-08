import FormatPrice from "@/helper/FormatPrice";
import Image from "next/image";
import Link from "next/link";
import AddToCart from "../Buttons/AddToCart";

const ProductCard = (curElem) => {
    return (
        <>
            {curElem && (
                <div className="w-52  flex flex-col" key={curElem.id}>
                    <Link href={`/products/${curElem.id}`}>
                        <div className="bg-blue-100 p-5 h-52 rounded-xl overflow-hidden relative flex items-center justify-center">
                            <Image
                                width={208}
                                height={208}
                                src={curElem.picture}
                                alt="productpicture"
                                className="w-[100%] h-[100%] object-contain"
                            />
                        </div>
                        <div className="mt-2">
                            <h3 className="font-bold capitalize truncate">{curElem.name}</h3>
                        </div>
                        <p className="text-sm mt-1 leading-4 text-gray-500 h-20">
                            {curElem.description.slice(0, 90)}...Read More
                        </p>
                    </Link>
                    <div className="flex">
                        <div className="text-2xl font-bold grow flex gap-3">
                            <h3>
                                <FormatPrice price={curElem.price} />
                            </h3>
                        </div>
                        <AddToCart product={curElem} name={'+'} />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCard;
