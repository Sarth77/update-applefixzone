"use client";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import React, { useEffect } from 'react';
const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
export default function AuthProvider({ children }) {

    const [mounted, setMounted] = React.useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return (
        <SessionProvider>

            <Toaster />
            {children}

        </SessionProvider>
    )
}