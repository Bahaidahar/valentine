"use server";

import jwt from "jsonwebtoken";
import { ValentineCard } from "@/types/valentine";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function verifyValentine(token: string) {
  try {
    if (!token) {
      throw new Error("Token is required");
    }

    const valentine = jwt.verify(token, JWT_SECRET) as ValentineCard;
    return valentine;
  } catch (error) {
    console.error("Error verifying valentine:", error);
    throw new Error("Invalid or expired token");
  }
}
