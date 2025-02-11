"use server";
import jwt from "jsonwebtoken";
import { ValentineCard } from "@/types/valentine";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function createValentine(formData: Partial<ValentineCard>) {
  try {
    const valentine: ValentineCard = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    } as ValentineCard;

    const token = jwt.sign(valentine, JWT_SECRET);
    return { token };
  } catch (error) {
    console.error("Error creating valentine:", error);
    throw new Error("Failed to create valentine");
  }
}
