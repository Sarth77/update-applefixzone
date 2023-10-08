"use client";
import React, { useEffect } from "react";


const RouterMounting = ({ children }) => {
    const [mounted, setMounted] = React.useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return <>{children}</>;
};

export default RouterMounting;