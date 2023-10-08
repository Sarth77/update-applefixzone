import { env } from "@/env.mjs";

export const getProducts = async () => {
    const options = {
        method: "GET",
    };
    const res = await fetch(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/products`, options);
    const datas = await res.json();
    const main_data = datas.data;
    return main_data
}

export const getProduct = async (id) => {
    const options = {
        method: "GET",
    };
    const res = await fetch(`${env.NEXT_PUBLIC_NEXT_PRODUCT_API}/api/products/${id}`, options);
    const data = await res.json();
    const main_data = data.data;
    return main_data
}
