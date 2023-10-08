import { env } from "@/env.mjs";
import axios from "axios";

export default axios.create({
    baseURL: env.NEXT_PUBLIC_NEXT_PRODUCT_API,
    headers: { "Content-Type": "application/json" },
});

export const axiosAuth = (auth) => axios.create({
    baseURL: env.NEXT_PUBLIC_NEXT_PRODUCT_API,
    headers: {
        "Content-Type": "application/json",
        "Authorization": auth
    },
});