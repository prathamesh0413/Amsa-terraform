// after adding google anylytics

import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsappButton from '@/components/WhatsappButton'; 
import { ReactNode } from 'react';
import Script from 'next/script'; // 1. Import the Script component

export const metadata = {
  title: 'Amsa Overseas',
  description: 'Professional IT Solutions',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 2. Add the Google Analytics Scripts here */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-LHWQJRPPR1" 
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LHWQJRPPR1');
          `}
        </Script>
        
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsappButton /> 
      </body>
    </html>
  );
}