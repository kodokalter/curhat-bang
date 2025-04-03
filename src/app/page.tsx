"use client";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Ambil username dari cookie
    const cookies = document.cookie.split("; ");
    const sessionCookie = cookies.find((cookie) => cookie.startsWith("session="));
    if (sessionCookie) {
      const sessionValue = sessionCookie.split("=")[1];
      setUsername(sessionValue === "active" ? "user" : null); // Sesuaikan dengan login
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 font-sans">
      <h1 className="text-4xl font-bold">
        {username ? `Hello, ${username} !` : "Welcome to the Homepage!"}
      </h1>
    </div>
  );
}
