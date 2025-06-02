import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Your global Tailwind CSS imports
import StoreContextProvider from "@/context/StoreContext"; // Import your StoreContextProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShareBite", // Adjust your app title
  description: "Food Delivery App", // Adjust description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreContextProvider>
          {children}
        </StoreContextProvider>
      </body>
    </html>
  );
}