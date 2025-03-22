"use server";
import { connectiondb } from "./connectiondb";
import { v4 as uuidv4 } from "uuid"; // Untuk membuat UUID

export const submitCurhat = async (email: string, uraianCurhat: string) => {
  try {
    const db = await connectiondb();
    const idCurhat = uuidv4(); // Generate UUID untuk id_curhat
    const waktuSubmit = new Date().toISOString(); // Waktu saat ini dalam format ISO

    console.log("Submitting data:", { idCurhat, email, uraianCurhat, waktuSubmit });

    // Query untuk menyisipkan data ke tabel curhatan
    await db`INSERT INTO curhatan (id_curhat, email, uraian_curhat, waktu_submit) VALUES (${idCurhat}, ${email}, ${uraianCurhat}, ${waktuSubmit})`;

    console.log("Data successfully submitted.");
    return { success: true, message: "Data successfully submitted." };
  } catch (error) {
    console.error("Error submitting data:", error);
    throw new Error("Failed to submit data to the database");
  }
};