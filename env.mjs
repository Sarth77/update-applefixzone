import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {

        GOOGLE_CLIENT_SECRET: z.string(),
        GOOGLE_CLIENT_ID: z.string(),

        NEXTAUTH_SECRET: z.string(),
        NEXT_REFRESH_TOKEN_API: z.string().url(),
        NEXT_PRODUCT_API: z.string().url(),
        NEXTAUTH_URL: z.string().url(),

        STRIPE_SECRET_KEY: z.string(),
        STRIPE_WEBHOOK_SECRET: z.string(),

    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {

        NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
        NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string(),
        NEXT_PUBLIC_FIREBASE_DATABASE_URL: z.string().url(),

        NEXT_PUBLIC_NEXT_PRODUCT_API: z.string().url(),
        NEXT_PUBLIC_APP_URL: z.string().url(),
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {

        NEXTAUTH_URL: process.env.NEXTAUTH_URL,

        NEXT_PRODUCT_API: process.env.NEXT_PRODUCT_API,

        NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,

        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,

        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXT_REFRESH_TOKEN_API: process.env.NEXT_REFRESH_TOKEN_API,

        NEXT_PUBLIC_NEXT_PRODUCT_API: process.env.NEXT_PUBLIC_NEXT_PRODUCT_API,


        NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,

        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    },

})