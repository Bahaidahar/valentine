import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ValentineCard } from "@/types/valentine";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const valentine = jwt.verify(token, JWT_SECRET) as ValentineCard;
    return NextResponse.json(valentine);
  } catch (error) {
    console.error("Error verifying valentine:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 }
    );
  }
}
