import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cargo-Track",
  description: "crq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        {children}

        {/*  TOASTER ACTIVO PARA TODA LA APP */}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: '#22c55e',
                color: 'white',
                fontWeight: 'bold',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#22c55e',
              },
            },
          }}
        />
      </body>
    </html>
  );
}