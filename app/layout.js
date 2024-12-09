import "./globals.css";

import AuthProvider from "@/provider/AuthProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "AppleFixZone - iPhone Spare Parts & Repair Components",
    template: "%s | AppleFixZone",
  },
  description:
    "Premium iPhone spare parts supplier - screens, batteries, motherboards, charging ports & repair components. Genuine iPhone parts for all models.",
  keywords: [
    "iPhone parts",
    "iPhone screen replacement",
    "iPhone battery",
    "iPhone motherboard",
    "iPhone charging port",
    "iPhone repair parts",
    "iPhone display",
    "iPhone connectors",
    "genuine iPhone components",
    "iPhone spare parts",
  ],
  authors: [{ name: "AppleFixZone" }],
  creator: "AppleFixZone",
  publisher: "AppleFixZone",
  formatDetection: {
    telephone: true,
    email: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-16x16.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://applefixzone.com",
    siteName: "AppleFixZone",
    title: "AppleFixZone - Premium iPhone Spare Parts Supplier",
    description:
      "Your trusted source for genuine iPhone spare parts - screens, batteries, motherboards, charging ports & repair components.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AppleFixZone - iPhone Spare Parts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AppleFixZone - iPhone Spare Parts & Components",
    description:
      "Premium iPhone spare parts supplier - screens, batteries, motherboards & repair components",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://applefixzone.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "AppleFixZone",
              description:
                "Premium iPhone spare parts and repair components supplier",
              image: "/store-image.jpg",
              telephone: "your-phone-number",
              address: {
                "@type": "PostalAddress",
                streetAddress: "your street address",
                addressLocality: "your city",
                addressRegion: "your region",
                postalCode: "your postal code",
                addressCountry: "IN",
              },
              priceRange: "₹₹₹",
              openingHours: "Mo-Sa 09:00-18:00",
              paymentAccepted: ["Cash", "UPI", "Credit Card", "Debit Card"],
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "INR",
                availability: "https://schema.org/InStock",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white">
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
