"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop({ children }) {
  const router = usePathname();
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [router]);

  return children;
}
