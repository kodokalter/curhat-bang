"use client";
import { useState } from "react";
import { getCurhat, getCurhatRandom } from "../function/getCurhat";
import { submitCurhat } from "../function/submitCurhat";

export default function Home() {
  const [email, setEmail] = useState("");
  const [uraianCurhat, setUraianCurhat] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null); // State untuk pesan respons

  const handleSubmit = async () => {
    try {
      const response = await submitCurhat(email, uraianCurhat); // Kirim data ke database
      setResponseMessage(response.message); // Tampilkan pesan sukses
      console.log("Submit response:", response);
    } catch (error) {
      console.error("Error submitting data:", error);
      setResponseMessage("Error submitting data."); // Tampilkan pesan error
    }
  };

  const handleGetData = async () => {
    try {
      let data;
      if (email.trim() === "") {
        // Jika email kosong, panggil getCurhatRandom
        data = await getCurhatRandom();
      } else {
        // Jika email tidak kosong, panggil getCurhat
        data = await getCurhat(email);
      }

      if (data && data.length > 0) {
        setResponseMessage(data[0].uraian_curhat); // Perbarui state uraianCurhat dengan data dari database
      } else {
        setResponseMessage("No data found."); // Jika tidak ada data
      }
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponseMessage("Error fetching data."); // Tampilkan pesan error jika terjadi kesalahan
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8 font-sans">
      <div className="flex flex-col items-center gap-4">
        {/* Tampilkan pesan respons jika ada */}
        {responseMessage && (
          <p className="text-green-500 text-lg font-medium">{responseMessage}</p>
        )}
        <h2 className="text-blue-400 text-4xl font-semibold">Curhat Bang</h2>
        <input
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update state email
          className="border border-blue-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <input
          type="text"
          placeholder="Type here..."
          value={uraianCurhat} // Nilai uraianCurhat akan diperbarui setelah Get Data
          onChange={(e) => setUraianCurhat(e.target.value)} // Update state uraianCurhat
          className="border border-blue-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <div className="flex gap-2">
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
            onClick={handleGetData}
          >
            Get Data
          </button>
        </div>
      </div>
    </div>
  );
}
