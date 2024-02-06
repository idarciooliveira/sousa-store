import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Toaster } from 'react-hot-toast';
import { CartProvider } from "./context/cart";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Toaster />
      <Component {...pageProps} />;
    </CartProvider>
  )
}
