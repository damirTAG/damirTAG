import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { CustomCursor } from "@/ui/Cursor";
import { Header } from "@/ui/Header";
import { Footer } from "@/ui/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "@damirtag's bio",
    description: "Experienced web developer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-white`}>
                <CustomCursor />
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
