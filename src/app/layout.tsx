// import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Optional: add bold or semibold
});

export const metadata: Metadata = {
  title: "Edu School Portal",
  description: "This is a school portal built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
