"use server";
import { connectiondb } from "./connectiondb";

export const getCurhat = async (email: string) => {
    try {
        const db = await connectiondb();
        console.log(`Fetching data for email: ${email}`);
        const result = await db`SELECT * FROM curhatan WHERE email = ${email}`; // Query dengan filter email
        console.log(`Fetched data for email: ${email}`, result);
        return result; // Mengembalikan data dalam bentuk array
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Failed to fetch data from the database");
    }
};

export const getCurhatRandom = async () => {
    try {
        const db = await connectiondb();
        console.log("Fetching random data based on oldest waktu_submit");
        const result = await db`SELECT * FROM curhatan ORDER BY RANDOM() LIMIT 1`; // Query untuk mengambil data tertua
        console.log("Fetched random data:", result);
        return result; // Mengembalikan data dalam bentuk array
    } catch (error) {
        console.error("Error fetching random data:", error);
        throw new Error("Failed to fetch random data from the database");
    }
};