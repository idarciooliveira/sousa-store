import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react";
import CartProvider from "./context/cart";


export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Toaster />
        <Component {...pageProps} />;
      </CartProvider>
    </SessionProvider>
  )
}
