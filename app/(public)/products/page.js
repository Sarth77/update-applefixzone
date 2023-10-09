import ProductCard from '@/components/ProductCard';
import { env } from '@/env.mjs';

const Products = async () => {

    const url = new URL(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/products`)
    const response = await fetch(url).then((res) => res.json())
    const products = await response?.data

    return (
        <>
            <section className="bg-[#fff]">
                <div className="max-w-[140rem] my-0 mx-auto py-[2rem] px-[3rem]">
                    <h1 className="text-black text-2xl font-semibold font-sans mb-4">
                        All Products
                    </h1>
                    <div className="card-grid my-[2em] mx-0 grid gap-12 grid-cols-autofill place-items-center place-content-center">
                        {products && products.map((product) => {
                            return (
                                <div key={product.id}>
                                    <ProductCard key={product.id} {...product} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products