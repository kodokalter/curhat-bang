"use client";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Periksa cookie session
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find((cookie) => cookie.startsWith("session="));
    if (sessionCookie) {
      const sessionValue = sessionCookie.split("=")[1];
      setIsLoggedIn(sessionValue === "active"); // Set isLoggedIn berdasarkan session
    }
  }, []);

  return (
    <html lang="en">
      <body className="flex">
        {/* Tampilkan sidebar hanya jika isLoggedIn true */}
        {isLoggedIn && (
          <aside className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-6">My App</h1>
            <nav className="flex flex-col gap-4">
              <Link href="/curhat" className="hover:text-blue-400">
                Curhat
              </Link>
              <Link href="/dashboard" className="hover:text-blue-400">
                Dashboard
              </Link>
              <Link href="/about" className="hover:text-blue-400">
                About
              </Link>
              <Link href="/anime" className="hover:text-blue-400">
                Anime
              </Link>
            </nav>
          </aside>
        )}
        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </body>
    </html>
  );
}
