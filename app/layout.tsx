import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Nav from "@/components/navigation/nav";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('', `${inter.className}`)}>
        <Nav/>
        {/* <nav>
          <ul className="flex gap-2 justify-between px-4 py-4 bg-gray-800 text-white">
            <li><Link href={"/"}>Home</Link></li>
            <li><Link href={"/about"}>About</Link></li>
            <li><Link href={"/products"}>Products</Link></li>
          </ul>
        </nav> */}
        {children}
      </body>
    </html>
  );
}
