'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import CartProvider from "./contexts/CartContext";



export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
        {children}
        </CartProvider>
        </body>
    </html>
  );
}
