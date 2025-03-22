// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

export const connectiondb = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }
  const db = await neon(process.env.DATABASE_URL);
  return db;
};