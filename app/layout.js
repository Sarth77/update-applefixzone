import './globals.css'

import AuthProvider from '@/provider/AuthProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'AppleFixZone',
  description: 'Apple Spare Parts',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-white`}>
        <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
