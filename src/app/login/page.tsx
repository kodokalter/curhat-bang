"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Login button clicked"); // Debugging log
    console.log("Login attempt:", { username, password }); // Debugging log
    try {
      if (username === "user" && password === "password") {
        console.log("Login successful"); // Debugging log
        document.cookie = "session=active; path=/"; // Set session cookie
        router.push("/"); // Redirect to home page
        return;
      }
      console.log("Invalid credentials"); // Debugging log
      setErrorMessage("Invalid username or password.");
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 font-sans">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-blue-400 text-4xl font-semibold">Login</h2>
        {errorMessage && (
          <p className="text-red-500 text-lg font-medium">{errorMessage}</p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-blue-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-blue-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
          onClick={() => {
            console.log("Button clicked"); // Debugging log;
            handleLogin(); // Call the login function
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
